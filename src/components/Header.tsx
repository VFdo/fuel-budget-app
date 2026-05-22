import { useFuelPricesContext } from '../context/FuelPricesContext'

export function Header() {
  const { effectiveDateLabel, status, isFallback, error } = useFuelPricesContext()

  const priceLine =
    status === 'loading' && !effectiveDateLabel
      ? 'Loading fuel prices…'
      : effectiveDateLabel
        ? `Prices ${effectiveDateLabel}`
        : 'Fuel prices'

  return (
    <header className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/25">
        📊
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        Fuel Budget Planner
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Sri Lanka · Track monthly fuel spending · {priceLine}
      </p>
      {status === 'loading' && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500" role="status">
          Updating prices from CPC…
        </p>
      )}
      {(status === 'error' || isFallback) && error && (
        <p
          className="mt-2 rounded-lg border border-amber-200/80 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200"
          role="alert"
        >
          {error}
        </p>
      )}
    </header>
  )
}
