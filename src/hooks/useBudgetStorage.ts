import { useEffect, useState } from 'react'
import type { BudgetPlannerState, FuelType } from '../types/budget'

const STORAGE_KEY = 'fuel-budget-planner-v1'

const DEFAULT_STATE: BudgetPlannerState = {
  fuelType: 'petrol92',
  monthlyBudgetLkr: 15000,
  litersUsed: 0,
}

interface StoredPayload {
  fuelType?: FuelType
  monthlyBudgetLkr?: number | ''
  litersUsed?: number | ''
}

function loadState(): BudgetPlannerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw) as StoredPayload
    return {
      fuelType: parsed.fuelType ?? DEFAULT_STATE.fuelType,
      monthlyBudgetLkr:
        parsed.monthlyBudgetLkr !== undefined
          ? parsed.monthlyBudgetLkr
          : DEFAULT_STATE.monthlyBudgetLkr,
      litersUsed:
        parsed.litersUsed !== undefined ? parsed.litersUsed : DEFAULT_STATE.litersUsed,
    }
  } catch {
    return DEFAULT_STATE
  }
}

export function useBudgetStorage() {
  const [state, setState] = useState<BudgetPlannerState>(loadState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(loadState())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, hydrated])

  const update = <K extends keyof BudgetPlannerState>(
    key: K,
    value: BudgetPlannerState[K],
  ) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  return { state, update, hydrated }
}
