import { combineReducers } from "redux";
import _ from 'lodash'

import { 
  ActionType,
  PriceActionTypes,
  WeeklyActionTypes,
  LoadWeeklyPrices,
  WeeklyActionType,
 } from './actions';
import { PriceSnapshot, WeekPriceRecord } from 'models'

export interface PriceState {
  history: PriceSnapshot[],
}

const initialState: PriceState = ({
  history: [],
});
interface WeekId {
  year: number,
  month: number,
}
export interface WeeklyState {
  prices: Map<string, WeekPriceRecord>,
}

const initialWeeklyState = {
  prices: new Map<string, WeekPriceRecord>(),
}

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
}

function getKey(r: WeekPriceRecord) {
  return `${r.year}-${r.week}`
}

export function weeklyPriceReducer(
  state: WeeklyState = initialWeeklyState,
  action: WeeklyActionTypes,
): WeeklyState {
  switch (action.type) {
    case WeeklyActionType.LOAD_WEEKLY_PRICES:
      const prices = new Map<string, WeekPriceRecord>()
      action.payload.forEach(r => {
        prices.set(getKey(r), r)
      })
      return {
        ...state,
        prices,
      }
    case WeeklyActionType.SAVE_WEEKLY_PRICES:
      const newPrices = new Map(state.prices)
      const record = action.payload
      newPrices.set(getKey(record), record)
      return {
        ...state,
        prices: newPrices,
      }
      break;
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  price: priceReducer,
  weeklyPrices: weeklyPriceReducer,
})

export type RootState = ReturnType<typeof rootReducer>
