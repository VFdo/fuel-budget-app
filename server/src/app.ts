import cors from 'cors'
import express from 'express'
import { fuelPricesRouter } from './routes/fuelPrices.js'

export function createApp() {
  const app = express()

  const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173'

  app.use(
    cors({
      origin: corsOrigin === '*' ? true : corsOrigin.split(',').map((o) => o.trim()),
    }),
  )

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.use('/api/fuel-prices', fuelPricesRouter)

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  return app
}
