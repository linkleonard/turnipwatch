import { combineReducers } from "redux";

import ActionTypes from "./actionTypes";
import { PriceActionTypes } from "./types";

export interface PriceSnapshot {

}

export interface PriceHistory {
  history: PriceSnapshot[],
}

const initialState: PriceHistory = ({
  history: [],
});

export function priceReducer(
  state: PriceHistory = initialState,
  action: PriceActionTypes,
): PriceHistory {
  switch (action.type) {
    case ActionTypes.ADD_PRICE:
      return {
        history: [
          ...state.history,
          action.payload,
        ],
      };
      default:
        return state;
  }
};

export const rootReducer = combineReducers({
  price: priceReducer,
})

export type RootState = ReturnType<typeof rootReducer>
