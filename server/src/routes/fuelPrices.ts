import { Router } from 'express'
import {
  FuelPriceScraperError,
  scrapeFuelPrices,
} from '../services/fuelPriceScraper.js'

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
    res.status(503).json({ error: reason })
  }
})
