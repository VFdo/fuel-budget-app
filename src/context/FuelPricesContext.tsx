import { createContext, useContext, type ReactNode } from 'react'
import { useFuelPrices, type FuelPricesState } from '../hooks/useFuelPrices'

type FuelPricesContextValue = FuelPricesState & { refresh: () => void }

const FuelPricesContext = createContext<FuelPricesContextValue | null>(null)

export function FuelPricesProvider({ children }: { children: ReactNode }) {
  const value = useFuelPrices()
  return (
    <FuelPricesContext.Provider value={value}>{children}</FuelPricesContext.Provider>
  )
}

export function useFuelPricesContext(): FuelPricesContextValue {
  const ctx = useContext(FuelPricesContext)
  if (!ctx) {
    throw new Error('useFuelPricesContext must be used within FuelPricesProvider')
  }
  return ctx
}
