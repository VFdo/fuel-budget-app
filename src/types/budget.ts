export type FuelType =
  | 'petrol92'
  | 'petrol95'
  | 'autoDiesel'
  | 'superDiesel'

export interface FuelProduct {
  id: FuelType
  label: string
  pricePerLiter: number
}

export type BudgetStatus = 'on_track' | 'approaching' | 'critical'

export interface BudgetInputs {
  fuelType: FuelType
  monthlyBudgetLkr: number
  litersUsed: number
}

export interface BudgetResults {
  totalCost: number
  remainingBudget: number
  remainingAffordableLiters: number
  usagePercentage: number
  status: BudgetStatus
  pricePerLiter: number
  litersUsed: number
  monthlyBudgetLkr: number
  isOverBudget: boolean
}

export interface BudgetPlannerState {
  fuelType: FuelType
  monthlyBudgetLkr: number | ''
  litersUsed: number | ''
}
