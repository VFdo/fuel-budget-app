import type { BudgetStatus } from '../types/budget'
import { formatPercent } from '../utils/calculations'

const barColors: Record<BudgetStatus, string> = {
  on_track: 'bg-emerald-500',
  approaching: 'bg-amber-500',
  critical: 'bg-red-500',
}

interface BudgetProgressBarProps {
  percentage: number
  status: BudgetStatus
}

export function BudgetProgressBar({ percentage, status }: BudgetProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentage))
  const displayPercent = Math.min(999.9, percentage)

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Budget used
        </span>
        <span className="text-lg font-bold tabular-nums text-slate-900 dark:text-white">
          {formatPercent(displayPercent)}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${barColors[status]}`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
