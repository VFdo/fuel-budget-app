import { FUEL_PRICE_EFFECTIVE_DATE } from '../constants/fuelPrices'

export function Header() {
  return (
    <header className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/25">
        📊
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        Fuel Budget Planner
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Sri Lanka · Track monthly fuel spending · Prices {FUEL_PRICE_EFFECTIVE_DATE}
      </p>
    </header>
  )
}
