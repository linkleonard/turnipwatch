import { PriceSnapshot } from '../types'

export enum ActionType {
  ADD_PRICE,
};

export interface AddPriceAction {
  type: typeof ActionType.ADD_PRICE,
  payload: PriceSnapshot,
}

export type PriceActionTypes = AddPriceAction


export const AddPrice = (price: Number, timestamp: Date): AddPriceAction => ({
  type: ActionType.ADD_PRICE,
  payload: { price, timestamp}
});
