import { BUDGET_STATUS_CONFIG } from '../constants/budgetStatus'
import type { BudgetResults } from '../types/budget'
import { BudgetProgressBar } from './BudgetProgressBar'
import { BudgetStatusBadge } from './BudgetStatusBadge'

interface BudgetHeroProps {
  results: BudgetResults
}

export function BudgetHero({ results }: BudgetHeroProps) {
  const statusCopy = BUDGET_STATUS_CONFIG[results.status]
  const remainingAmount = Math.abs(results.remainingBudget)
  const formattedAmount = remainingAmount.toLocaleString('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Remaining budget
        </p>
        <BudgetStatusBadge status={results.status} />
      </div>

      <p
        className={`text-4xl font-bold tabular-nums tracking-tight transition-colors duration-300 sm:text-5xl ${
          results.isOverBudget
            ? 'text-red-600 dark:text-red-400'
            : 'text-slate-900 dark:text-white'
        }`}
      >
        {results.isOverBudget && <span className="mr-1">−</span>}
        Rs. {formattedAmount}
      </p>

      <BudgetProgressBar percentage={results.usagePercentage} status={results.status} />

      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {statusCopy.description}
      </p>
    </div>
  )
}
