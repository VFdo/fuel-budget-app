import type { FuelPrices } from '../types/fuelPrices.js'

/** Last known CPC prices (02 May 2026 revision) — used when scraping fails */
export const FALLBACK_FUEL_PRICES: FuelPrices = {
  petrol92: 434,
  petrol95: 495,
  diesel: 407,
  superDiesel: 478,
  updatedAt: '2026-05-30',
}

export const CPC_FUEL_PRICING_URL =
  'https://ceypetco.gov.lk/marketing-sales/'
