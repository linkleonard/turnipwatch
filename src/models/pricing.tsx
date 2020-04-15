export type MaybePrice = number | null

export interface WeekPriceRecord {
  year: number,
  week: number,
  record: PriceRecord,
}

export interface PriceRecord {
  buyPrice: MaybePrice,
  prices: MaybePrice[],
}

export const EmptyPriceRecord: PriceRecord = {
  buyPrice: null,
  prices: [],
}
