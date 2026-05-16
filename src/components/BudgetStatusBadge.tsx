import { BUDGET_STATUS_CONFIG } from '../constants/budgetStatus'
import type { BudgetStatus } from '../types/budget'

const statusStyles: Record<
  BudgetStatus,
  { ring: string; bg: string; text: string; dot: string }
> = {
  on_track: {
    ring: 'ring-emerald-500/30',
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  approaching: {
    ring: 'ring-amber-500/30',
    bg: 'bg-amber-500/10 dark:bg-amber-500/15',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  critical: {
    ring: 'ring-red-500/30',
    bg: 'bg-red-500/10 dark:bg-red-500/15',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500 animate-pulse',
  },
}

interface BudgetStatusBadgeProps {
  status: BudgetStatus
}

export function BudgetStatusBadge({ status }: BudgetStatusBadgeProps) {
  const config = BUDGET_STATUS_CONFIG[status]
  const styles = statusStyles[status]

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 ring-1 transition-all duration-300 ${styles.ring} ${styles.bg} ${styles.text}`}
      role="status"
    >
      <span className={`h-2 w-2 rounded-full ${styles.dot}`} aria-hidden />
      <span className="text-sm font-semibold">{config.label}</span>
    </div>
  )
}
