import { PriceSnapshot, WeekPriceRecord } from 'models'

export enum ActionType {
  ADD_PRICE = "AddPrice",
  SAVE_PRICE = "SavePrice",
  LOAD_PRICES = "LoadPrices",
};

export enum WeeklyActionType {
  SAVE_WEEKLY_PRICES = "SaveWeeklyPrices",
  LOAD_WEEKLY_PRICES = "LoadWeeklyPrices",
}

export interface SaveWeeklyPrices {
  type: typeof WeeklyActionType.SAVE_WEEKLY_PRICES,
  payload: WeekPriceRecord,
}

export interface LoadWeeklyPrices {
  type: typeof WeeklyActionType.LOAD_WEEKLY_PRICES,
  payload: WeekPriceRecord[],
}

export interface AddPriceAction {
  type: typeof ActionType.ADD_PRICE,
  payload: PriceSnapshot,
}

export interface SavePriceAction {
  type: typeof ActionType.SAVE_PRICE,
  payload: {
    success: Boolean,
    value?: PriceSnapshot,
  },
}

export interface LoadPriceAction {
  type: typeof ActionType.LOAD_PRICES,
  payload: {
    items: PriceSnapshot[],
  },
}

export type WeeklyActionTypes = LoadWeeklyPrices | SaveWeeklyPrices
export type PriceActionTypes = AddPriceAction | SavePriceAction | LoadPriceAction

export const AddPrice = (price: number, timestamp: Date): AddPriceAction => ({
  type: ActionType.ADD_PRICE,
  payload: { price, timestamp }
});

export const SavePrice = (success: Boolean, payload?: PriceSnapshot): SavePriceAction => ({
  type: ActionType.SAVE_PRICE,
  payload: {
    success,
    value: payload,
  }
})

export const LoadPrice = (items: PriceSnapshot[]): LoadPriceAction => ({
  type: ActionType.LOAD_PRICES,
  payload: { items },
})


export const SaveWeeklyPrices = (r: WeekPriceRecord): SaveWeeklyPrices => ({
  type: WeeklyActionType.SAVE_WEEKLY_PRICES,
  payload: r,
})

export const LoadWeeklyPrices = (records: WeekPriceRecord[]): LoadWeeklyPrices => ({
  type: WeeklyActionType.LOAD_WEEKLY_PRICES,
  payload: records,
})
