import { combineReducers } from "redux";

import { ActionType, PriceActionTypes } from './actions';
import { PriceSnapshot } from 'models'

export interface PriceState {
  history: PriceSnapshot[],
}

const initialState: PriceState = ({
  history: [],
});

export function priceReducer(
  state: PriceState = initialState,
  action: PriceActionTypes,
): PriceState {
  switch (action.type) {
    case ActionType.ADD_PRICE:
      return {
        history: [
          ...state.history,
          action.payload,
        ],
      };
    case ActionType.LOAD_PRICES:
      return {
        history: [
          ...state.history,
          ...action.payload.items,
        ]
      }
    default:
      return state;

  }
};

export const rootReducer = combineReducers({
  price: priceReducer,
})

export type RootState = ReturnType<typeof rootReducer>
