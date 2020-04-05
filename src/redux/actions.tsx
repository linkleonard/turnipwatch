import { PriceSnapshot } from '../types'

export enum ActionType {
  ADD_PRICE = "AddPrice",
  SAVE_PRICE = "SavePrice",
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

export type PriceActionTypes = AddPriceAction

export const AddPrice = (price: Number, timestamp: Date): AddPriceAction => ({
  type: ActionType.ADD_PRICE,
  payload: { price, timestamp}
});

export const SavePrice = (success: Boolean, payload?: PriceSnapshot): SavePriceAction => ({
  type: ActionType.SAVE_PRICE,
  payload: {
    success,
    value: payload,
  }
})