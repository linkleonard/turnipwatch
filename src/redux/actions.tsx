import { IWeekPriceRecord } from 'models'

export enum WeeklyActionType {
  SAVE_WEEKLY_PRICES = "SaveWeeklyPrices",
  LOAD_WEEKLY_PRICES = "LoadWeeklyPrices",
}

export interface SaveWeeklyPrices {
  type: typeof WeeklyActionType.SAVE_WEEKLY_PRICES,
  payload: IWeekPriceRecord,
}

export interface LoadWeeklyPrices {
  type: typeof WeeklyActionType.LOAD_WEEKLY_PRICES,
  payload: IWeekPriceRecord[],
}

export type WeeklyActionTypes = LoadWeeklyPrices | SaveWeeklyPrices

export const SaveWeeklyPrices = (r: IWeekPriceRecord): SaveWeeklyPrices => ({
  type: WeeklyActionType.SAVE_WEEKLY_PRICES,
  payload: r,
})

export const LoadWeeklyPrices = (records: IWeekPriceRecord[]): LoadWeeklyPrices => ({
  type: WeeklyActionType.LOAD_WEEKLY_PRICES,
  payload: records,
})
