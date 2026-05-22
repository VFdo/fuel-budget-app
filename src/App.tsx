import { BudgetPlannerForm } from './components/BudgetPlannerForm'
import { Header } from './components/Header'
import { FuelPricesProvider } from './context/FuelPricesContext'

function App() {
  return (
    <FuelPricesProvider>
      <div className="dashboard-gradient min-h-svh px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-md space-y-8">
          <Header />
          <BudgetPlannerForm />
          <footer className="text-center text-xs text-slate-500 dark:text-slate-500">
            Values saved locally on this device.
          </footer>
        </div>
      </div>
    </FuelPricesProvider>
  )
}

export default App
