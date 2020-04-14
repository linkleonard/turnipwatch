/**
 * The price in a particular snapshot in time.
 */
export interface PriceSnapshot {
  price: number, 
  timestamp: Date,
}

export interface PriceHistorySnapshot {
  price: number | null,
  timestamp: Date,
}

/**
 * A cleaned price history, where there is exactly 1 snapshot per (day, AM | PM).
 */
export interface PriceHistory {
  items: PriceHistorySnapshot[],
}

export type MaybePrice = number | undefined

export interface WeekPriceRecord {
  year: number,
  week: number,
  prices: MaybePrice[],
}
