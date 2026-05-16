import { useMemo } from 'react'
import { useBudgetStorage } from '../hooks/useBudgetStorage'
import { calculateBudget } from '../utils/calculations'
import { BudgetDashboard } from './BudgetDashboard'
import { BudgetHero } from './BudgetHero'
import { Card } from './Card'
import { FuelTypeSelect } from './FuelTypeSelect'
import { NumberInput } from './NumberInput'

export function BudgetPlannerForm() {
  const { state, update, hydrated } = useBudgetStorage()

  const results = useMemo(
    () =>
      calculateBudget({
        fuelType: state.fuelType,
        monthlyBudgetLkr: state.monthlyBudgetLkr === '' ? 0 : state.monthlyBudgetLkr,
        litersUsed: state.litersUsed === '' ? 0 : state.litersUsed,
      }),
    [state.fuelType, state.monthlyBudgetLkr, state.litersUsed],
  )

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-md animate-pulse space-y-4">
        <div className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <Card className="border-blue-200/50 bg-gradient-to-br from-white to-blue-50/30 dark:border-blue-900/30 dark:from-slate-900 dark:to-blue-950/20">
        <BudgetHero results={results} />
      </Card>

      <Card className="space-y-4">
        <FuelTypeSelect
          value={state.fuelType}
          onChange={(v) => update('fuelType', v)}
        />
        <NumberInput
          id="monthly-budget"
          label="Monthly fuel budget"
          value={state.monthlyBudgetLkr}
          onChange={(v) => update('monthlyBudgetLkr', v)}
          suffix="LKR"
          step={100}
          hint="How much you plan to spend on fuel this month"
        />
        <NumberInput
          id="liters-used"
          label="Liters used this month"
          value={state.litersUsed}
          onChange={(v) => update('litersUsed', v)}
          suffix="L"
          step={0.1}
        />
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
          Breakdown
        </h2>
        <BudgetDashboard results={results} />
      </Card>
    </div>
  )
}
