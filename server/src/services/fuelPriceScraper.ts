import axios from 'axios'
import * as cheerio from 'cheerio'
import type { AnyNode } from 'domhandler'
import type { FuelPriceField, FuelPrices } from '../types/fuelPrices.js'

const CPC_FUEL_PRICING_URL = 'https://ceypetco.gov.lk/marketing-sales/'

const FUEL_NAME_TO_FIELD: Record<string, FuelPriceField> = {
  'lanka petrol 92 octane': 'petrol92',
  'lanka petrol 95 octane euro 4': 'petrol95',
  'lanka auto diesel': 'diesel',
  'lanka super diesel 4 star euro 4': 'superDiesel',
}

const REQUIRED_FIELDS: FuelPriceField[] = [
  'petrol92',
  'petrol95',
  'diesel',
  'superDiesel',
]

function normalizeFuelName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ')
}

function parsePriceFromCard($card: cheerio.Cheerio<AnyNode>): number | null {
  const raw = $card.find('.price-value').text().replace(/\s+/g, ' ')
  const match = raw.match(/(\d+(?:\.\d+)?)/)
  if (!match) return null
  const value = Math.round(parseFloat(match[1]))
  return Number.isFinite(value) && value > 0 ? value : null
}

function parseEffectiveDate(text: string): string | null {
  const match = text.match(/(\d{2})-(\d{2})-(\d{4})/)
  if (!match) return null
  const [, day, month, year] = match
  return `${year}-${month}-${day}`
}

function resolveFuelField(fuelName: string): FuelPriceField | null {
  const normalized = normalizeFuelName(fuelName)
  if (FUEL_NAME_TO_FIELD[normalized]) {
    return FUEL_NAME_TO_FIELD[normalized]
  }
  if (/petrol\s*92/i.test(fuelName)) return 'petrol92'
  if (/petrol\s*95/i.test(fuelName)) return 'petrol95'
  if (/auto\s*diesel/i.test(fuelName)) return 'diesel'
  if (/super\s*diesel/i.test(fuelName)) return 'superDiesel'
  return null
}

function parsePricesFromHtml(html: string): Partial<FuelPrices> {
  const $ = cheerio.load(html)
  const partial: Partial<FuelPrices> = {}
  let latestDate: string | null = null

  $('.price-card').each((_, element) => {
    const $card = $(element)
    const fuelName = $card.find('.fuel-name').first().text().trim()
    const field = resolveFuelField(fuelName)
    if (!field) return

    const price = parsePriceFromCard($card)
    if (price !== null) {
      partial[field] = price
    }

    const dateText = $card.find('.effective-date').text()
    const parsedDate = parseEffectiveDate(dateText)
    if (parsedDate && (!latestDate || parsedDate > latestDate)) {
      latestDate = parsedDate
    }
  })

  if (latestDate) {
    partial.updatedAt = latestDate
  }

  return partial
}

function isComplete(prices: Partial<FuelPrices>): prices is FuelPrices {
  return (
    REQUIRED_FIELDS.every((field) => typeof prices[field] === 'number') &&
    typeof prices.updatedAt === 'string'
  )
}

export class FuelPriceScraperError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FuelPriceScraperError'
  }
}

export async function scrapeFuelPrices(): Promise<FuelPrices> {
  let html: string

  try {
    const { data } = await axios.get<string>(CPC_FUEL_PRICING_URL, {
      timeout: 15_000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; FuelBudgetPlanner/1.0; +https://github.com)',
        Accept: 'text/html',
      },
      responseType: 'text',
      validateStatus: (status) => status >= 200 && status < 300,
    })
    html = data
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch CPC page'
    throw new FuelPriceScraperError(message)
  }

  const partial = parsePricesFromHtml(html)

  if (!isComplete(partial)) {
    const missing = REQUIRED_FIELDS.filter(
      (field) => typeof partial[field] !== 'number',
    )
    throw new FuelPriceScraperError(
      `Incomplete scrape — missing: ${missing.join(', ')}`,
    )
  }

  return partial
}
