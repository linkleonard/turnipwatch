import ActionTypes from "./actionTypes";
import { AddPriceAction } from "./types";

export const AddPrice = (price: Number, timestamp: Date): AddPriceAction => ({
  type: ActionTypes.ADD_PRICE,
  payload: { price, timestamp}
});
