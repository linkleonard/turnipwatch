import ActionTypes from "./actionTypes";

export interface AddPriceAction {
    type: ActionTypes,
    payload: { price: Number, timestamp: Date },
}

export type PriceActionTypes = AddPriceAction
