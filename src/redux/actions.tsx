import { PriceSnapshot } from 'models'

export enum ActionType {
  ADD_PRICE = "AddPrice",
  SAVE_PRICE = "SavePrice",
  LOAD_PRICES = "LoadPrices",
};

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
