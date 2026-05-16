import { getFuelProduct } from '../constants/fuelPrices'
import type { BudgetInputs, BudgetResults, BudgetStatus } from '../types/budget'

export const APPROACHING_THRESHOLD = 75
export const CRITICAL_THRESHOLD = 95

export function getBudgetStatus(usagePercentage: number, isOverBudget: boolean): BudgetStatus {
  if (isOverBudget || usagePercentage >= CRITICAL_THRESHOLD) return 'critical'
  if (usagePercentage >= APPROACHING_THRESHOLD) return 'approaching'
  return 'on_track'
}

export function calculateBudget(inputs: BudgetInputs): BudgetResults {
  const { pricePerLiter } = getFuelProduct(inputs.fuelType)
  const monthlyBudgetLkr = Math.max(0, inputs.monthlyBudgetLkr)
  const litersUsed = Math.max(0, inputs.litersUsed)
  const totalCost = litersUsed * pricePerLiter
  const remainingBudget = monthlyBudgetLkr - totalCost
  const isOverBudget = remainingBudget < 0

  const usagePercentage =
    monthlyBudgetLkr > 0 ? (totalCost / monthlyBudgetLkr) * 100 : totalCost > 0 ? 100 : 0

  const remainingAffordableLiters =
    pricePerLiter > 0 ? Math.max(0, remainingBudget / pricePerLiter) : 0

  return {
    totalCost,
    remainingBudget,
    remainingAffordableLiters,
    usagePercentage,
    status: getBudgetStatus(usagePercentage, isOverBudget),
    pricePerLiter,
    litersUsed,
    monthlyBudgetLkr,
    isOverBudget,
  }
}

export function formatLiters(value: number): string {
  return `${value.toLocaleString('en-LK', { maximumFractionDigits: 2 })} L`
}

export function formatCurrency(value: number): string {
  return `Rs. ${value.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatPercent(value: number): string {
  return `${value.toLocaleString('en-LK', { maximumFractionDigits: 1 })}%`
}
