import type { BudgetStatus } from '../types/budget'

export const BUDGET_STATUS_CONFIG: Record<
  BudgetStatus,
  { label: string; description: string }
> = {
  on_track: {
    label: 'On Track',
    description: 'Spending is within a healthy range for your budget.',
  },
  approaching: {
    label: 'Approaching Limit',
    description: 'You are nearing your monthly fuel budget. Plan refills carefully.',
  },
  critical: {
    label: 'Budget Critical',
    description: 'Budget is nearly exhausted or exceeded. Reduce usage if possible.',
  },
}
