import { combineReducers } from "redux";

import { ActionType, PriceActionTypes } from './actions';
import { PriceSnapshot } from "../types";

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
    case ActionType.ADD_PRICE:
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
