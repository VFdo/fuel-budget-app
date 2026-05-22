# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-22

### Added

- **Express.js fuel prices API** — `GET /api/fuel-prices` scrapes live CPC retail prices from [ceypetco.gov.lk](https://ceypetco.gov.lk/marketing-sales/) (Petrol 92, Petrol 95, Auto Diesel, Super Diesel) with axios + cheerio
- Server fallback prices and `X-Fuel-Prices-Source: fallback` header when scraping fails
- **Frontend live price integration** — fetches `/api/fuel-prices`, replaces hardcoded liter prices, and shows the CPC effective date in the header
- Fuel price **localStorage cache** with automatic refresh every 24 hours (on page load when stale, and on an interval while the tab is open)
- Loading skeleton and amber **error/fallback** banner when the API is unavailable
- Vite dev proxy for `/api` → backend (`localhost:3001`)

### Changed

- Header subtitle now displays the scraped effective date (e.g. “Prices 2 May 2026”) instead of a fixed “22 March 2026” string
- Budget calculations and fuel type selector use API-driven prices passed from context

### Technical

- TypeScript Express server under `server/` (modular scraper service, routes, CORS, health check)
- `FuelPricesProvider` + `useFuelPrices` hook; shared `FuelPricesApi` types
- New scripts: `dev:server`, `server`, `build:server`, `start:server`
- Dependencies: express, axios, cheerio, cors, tsx

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

[1.1.0]: https://github.com/VFdo/fuel-budget-app/releases/tag/v1.1.0
[1.0.0]: https://github.com/VFdo/fuel-budget-app/releases/tag/v1.0.0
