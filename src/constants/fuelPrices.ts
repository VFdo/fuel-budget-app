import type { FuelProduct } from '../types/budget'
import type { FuelPricesApi } from '../types/fuelPrices'

/** Used when the API is unreachable and no cache exists */
export const FALLBACK_FUEL_PRICES: FuelPricesApi = {
  petrol92: 410,
  petrol95: 470,
  diesel: 392,
  superDiesel: 458,
  updatedAt: '2026-05-02',
}

type FuelPriceKey = 'petrol92' | 'petrol95' | 'diesel' | 'superDiesel'

const PRODUCT_LABELS: { id: FuelProduct['id']; label: string; apiKey: FuelPriceKey }[] = [
  { id: 'petrol92', label: 'Petrol 92', apiKey: 'petrol92' },
  { id: 'petrol95', label: 'Petrol 95', apiKey: 'petrol95' },
  { id: 'autoDiesel', label: 'Auto Diesel', apiKey: 'diesel' },
  { id: 'superDiesel', label: 'Super Diesel', apiKey: 'superDiesel' },
]

export function apiPricesToProducts(prices: FuelPricesApi): FuelProduct[] {
  return PRODUCT_LABELS.map(({ id, label, apiKey }) => ({
    id,
    label,
    pricePerLiter: prices[apiKey],
  }))
}

export function getFuelProduct(id: FuelProduct['id'], products: FuelProduct[]): FuelProduct {
  const product = products.find((p) => p.id === id)
  if (!product) throw new Error(`Unknown fuel type: ${id}`)
  return product
}

export function formatEffectiveDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-LK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
