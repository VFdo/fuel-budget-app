import { useCallback, useEffect, useRef, useState } from 'react'
import {
  apiPricesToProducts,
  FALLBACK_FUEL_PRICES,
  formatEffectiveDate,
} from '../constants/fuelPrices'
import type { FuelProduct } from '../types/budget'
import type { FuelPricesApi } from '../types/fuelPrices'

const CACHE_KEY = 'fuel-prices-cache-v1'
const REFRESH_MS = 24 * 60 * 60 * 1000

interface PriceCache {
  prices: FuelPricesApi
  cachedAt: number
}

export type FuelPricesStatus = 'loading' | 'ready' | 'error'

export interface FuelPricesState {
  products: FuelProduct[]
  effectiveDateLabel: string
  status: FuelPricesStatus
  isFallback: boolean
  error: string | null
}

function readCache(): PriceCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PriceCache
    if (
      !parsed?.prices ||
      typeof parsed.cachedAt !== 'number' ||
      typeof parsed.prices.petrol92 !== 'number'
    ) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function writeCache(prices: FuelPricesApi): void {
  const entry: PriceCache = { prices, cachedAt: Date.now() }
  localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
}

function isCacheStale(cachedAt: number): boolean {
  return Date.now() - cachedAt >= REFRESH_MS
}

function buildStateFromPrices(
  prices: FuelPricesApi,
  status: FuelPricesStatus,
  isFallback: boolean,
  error: string | null,
): FuelPricesState {
  return {
    products: apiPricesToProducts(prices),
    effectiveDateLabel: formatEffectiveDate(prices.updatedAt),
    status,
    isFallback,
    error,
  }
}

async function fetchFuelPrices(): Promise<FuelPricesApi> {
  const response = await fetch('/api/fuel-prices')
  if (!response.ok) {
    throw new Error(`Fuel prices request failed (${response.status})`)
  }
  const data = (await response.json()) as FuelPricesApi
  if (
    typeof data.petrol92 !== 'number' ||
    typeof data.petrol95 !== 'number' ||
    typeof data.diesel !== 'number' ||
    typeof data.superDiesel !== 'number' ||
    typeof data.updatedAt !== 'string'
  ) {
    throw new Error('Invalid fuel prices response')
  }
  return data
}

export function useFuelPrices(): FuelPricesState & { refresh: () => void } {
  const cache = readCache()
  const hasCache = cache !== null

  const [state, setState] = useState<FuelPricesState>(() => {
    if (hasCache) {
      return buildStateFromPrices(cache!.prices, 'ready', false, null)
    }
    return {
      products: [],
      effectiveDateLabel: '',
      status: 'loading',
      isFallback: false,
      error: null,
    }
  })

  const isMounted = useRef(true)

  const applyPrices = useCallback(
    (prices: FuelPricesApi, isFallback: boolean, error: string | null) => {
      writeCache(prices)
      setState(buildStateFromPrices(prices, 'ready', isFallback, error))
    },
    [],
  )

  const loadPrices = useCallback(
    async (options?: { silent?: boolean }) => {
      const silent = options?.silent ?? false
      const cached = readCache()

      if (!silent && !cached) {
        setState((prev) => ({ ...prev, status: 'loading', error: null }))
      }

      try {
        const prices = await fetchFuelPrices()
        if (!isMounted.current) return
        applyPrices(prices, false, null)
      } catch (err) {
        if (!isMounted.current) return
        const message =
          err instanceof Error ? err.message : 'Could not load fuel prices'

        if (cached) {
          applyPrices(
            cached.prices,
            true,
            `${message} — showing last saved prices`,
          )
          return
        }

        setState(
          buildStateFromPrices(
            FALLBACK_FUEL_PRICES,
            'error',
            true,
            `${message} — using estimated prices`,
          ),
        )
      }
    },
    [applyPrices],
  )

  useEffect(() => {
    isMounted.current = true
    const cached = readCache()

    if (!cached || isCacheStale(cached.cachedAt)) {
      void loadPrices({ silent: !!cached })
    }

    const intervalId = window.setInterval(() => {
      void loadPrices({ silent: true })
    }, REFRESH_MS)

    return () => {
      isMounted.current = false
      window.clearInterval(intervalId)
    }
  }, [loadPrices])

  return { ...state, refresh: () => void loadPrices() }
}
