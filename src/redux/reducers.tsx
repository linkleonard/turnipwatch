import { combineReducers } from "redux"
import _ from 'lodash'

import {
  WeeklyActionTypes,
  WeeklyActionType,
} from './actions'
import { IWeekPriceRecord } from 'models'

export interface WeeklyState {
  prices: { [k: string]: IWeekPriceRecord },
}

const initialWeeklyState = {
  prices: {},
}

function getKey(r: IWeekPriceRecord) {
  return `${r.year}-${r.week}`
}

export function weeklyPriceReducer(
  state: WeeklyState = initialWeeklyState,
  action: WeeklyActionTypes,
): WeeklyState {
  switch (action.type) {
    case WeeklyActionType.LOAD_WEEKLY_PRICES:
      return {
        ...state,
        prices: _.keyBy(action.payload, getKey),
      }
    case WeeklyActionType.SAVE_WEEKLY_PRICES:
      return {
        ...state,
        prices: {
          ...state.prices,
          [getKey(action.payload)]: action.payload
        },
      }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  weeklyPrices: weeklyPriceReducer,
})

export type RootState = ReturnType<typeof rootReducer>
