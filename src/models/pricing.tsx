export type MaybePrice = number | null

export interface WeekPriceRecord {
  year: number,
  week: number,
  prices: MaybePrice[],
}
