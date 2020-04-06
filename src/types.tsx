/**
 * The price in a particular snapshot in time.
 */
export interface PriceSnapshot {
  price: Number, 
  timestamp: Date,
}

export interface PriceHistorySnapshot {
  price: Number | null,
  timestamp: Date,
}

/**
 * A cleaned price history, where there is exactly 1 snapshot per (day, AM | PM).
 */
export interface PriceHistory {
  items: PriceHistorySnapshot[],
}
