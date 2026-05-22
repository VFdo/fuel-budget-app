import type { FuelProduct, FuelType } from '../types/budget'

interface FuelTypeSelectProps {
  value: FuelType
  products: FuelProduct[]
  onChange: (value: FuelType) => void
  disabled?: boolean
}

export function FuelTypeSelect({
  value,
  products,
  onChange,
  disabled = false,
}: FuelTypeSelectProps) {
  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Fuel type
      </legend>
      <div className="grid grid-cols-2 gap-2">
        {products.map((product) => {
          const selected = value === product.id
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onChange(product.id)}
              disabled={disabled}
              className={`rounded-xl border px-3 py-3 text-left text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                selected
                  ? 'border-blue-500 bg-blue-50 text-blue-950 ring-2 ring-blue-500/25 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-50'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span className="block font-medium">{product.label}</span>
              <span className="mt-0.5 block text-xs opacity-75">
                Rs. {product.pricePerLiter.toLocaleString('en-LK')}/L
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
