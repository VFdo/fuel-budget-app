# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-22

### Added

- **Fuel Budget Planner** — single-page app to track and manage monthly fuel spending in Sri Lanka
- Fuel type selection: Petrol 92, Petrol 95, Auto Diesel, Super Diesel
- Monthly fuel budget input (LKR) and liters-used input
- Real-time calculations:
  - Total fuel cost
  - Remaining budget
  - Remaining affordable liters (at current fuel price)
  - Budget usage percentage
- Budget status indicators:
  - **On Track** (under 75% used)
  - **Approaching Limit** (75–94% used)
  - **Budget Critical** (95%+ used or over budget)
- Finance-style dashboard UI: hero metrics, progress bar, metric cards, status badges
- Hardcoded Sri Lankan fuel prices (Ministry of Energy revision, 22 March 2026)
- **localStorage** persistence for fuel type, budget, and liters used
- Mobile-first, dark-mode-friendly layout (Tailwind CSS)
- GitHub Actions workflow to build and deploy to Vercel on push to `main`

### Technical

- React 19 + TypeScript + Vite 8
- Reusable functional components (`Card`, `NumberInput`, `FuelTypeSelect`, `BudgetHero`, `BudgetDashboard`, etc.)
- Typed budget calculation utilities and status thresholds

[1.0.0]: https://github.com/VFdo/fuel-budget-app/releases/tag/v1.0.0
