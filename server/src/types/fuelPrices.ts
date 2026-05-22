export interface FuelPrices {
  petrol92: number
  petrol95: number
  diesel: number
  superDiesel: number
  updatedAt: string
}

export type FuelPriceField = keyof Omit<FuelPrices, 'updatedAt'>
