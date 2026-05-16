import type { FuelProduct } from '../types/budget'

/** Hardcoded prices (LKR/liter) — Ministry of Energy revision, 22 Mar 2026 */
export const FUEL_PRICE_EFFECTIVE_DATE = '22 March 2026'

export const FUEL_PRODUCTS: FuelProduct[] = [
  { id: 'petrol92', label: 'Petrol 92', pricePerLiter: 398 },
  { id: 'petrol95', label: 'Petrol 95', pricePerLiter: 455 },
  { id: 'autoDiesel', label: 'Auto Diesel', pricePerLiter: 382 },
  { id: 'superDiesel', label: 'Super Diesel', pricePerLiter: 443 },
]

export function getFuelProduct(id: FuelProduct['id']): FuelProduct {
  const product = FUEL_PRODUCTS.find((p) => p.id === id)
  if (!product) throw new Error(`Unknown fuel type: ${id}`)
  return product
}
