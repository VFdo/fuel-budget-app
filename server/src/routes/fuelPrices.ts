import { Router } from 'express'
import { FALLBACK_FUEL_PRICES } from '../constants/fallbackPrices.js'
import {
  FuelPriceScraperError,
  scrapeFuelPrices,
} from '../services/fuelPriceScraper.js'
import type { FuelPrices } from '../types/fuelPrices.js'

export const fuelPricesRouter = Router()

fuelPricesRouter.get('/', async (_req, res) => {
  try {
    const prices = await scrapeFuelPrices()
    res.json(prices)
  } catch (error) {
    const reason =
      error instanceof FuelPriceScraperError
        ? error.message
        : 'Unexpected error while fetching fuel prices'

    console.error('[fuel-prices]', reason)

    res.setHeader('X-Fuel-Prices-Source', 'fallback')
    res.json(FALLBACK_FUEL_PRICES satisfies FuelPrices)
  }
})
