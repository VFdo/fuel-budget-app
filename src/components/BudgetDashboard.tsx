import type { BudgetResults } from '../types/budget'
import { formatCurrency, formatLiters } from '../utils/calculations'
import { MetricCard } from './MetricCard'

interface BudgetDashboardProps {
  results: BudgetResults
}

export function BudgetDashboard({ results }: BudgetDashboardProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <MetricCard
        label="Total fuel cost"
        value={formatCurrency(results.totalCost)}
        subtext={`${formatLiters(results.litersUsed)} @ Rs. ${results.pricePerLiter.toLocaleString('en-LK')}/L`}
        variant="highlight"
      />
      <MetricCard
        label="Monthly budget"
        value={formatCurrency(results.monthlyBudgetLkr)}
      />
      <MetricCard
        label="Affordable liters left"
        value={formatLiters(results.remainingAffordableLiters)}
        subtext="At current fuel price"
      />
      <MetricCard
        label="Liters used"
        value={formatLiters(results.litersUsed)}
        variant="muted"
      />
    </div>
  )
}
