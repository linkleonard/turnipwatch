import React from 'react'
import _ from 'lodash'
import { RouteComponentProps } from '@reach/router'

import PriceHistoryGraph from './PriceHistoryGraph'
import PriceAnalyzer from './PriceAnalyzer'
import WeekPriceForm, { FormResult } from './WeekPriceForm'
import WeekPriceHistoryGraph from './WeekPriceHistoryGraph'
import { useDispatch, useSelector } from 'react-redux'
import { SaveWeeklyPrices } from 'redux/actions'
import moment from 'moment'
import { RootState } from 'redux/reducers'

function Component(props: RouteComponentProps) {
  const dispatch = useDispatch()

  const now = moment()
  const key = `${now.year()}-${now.weekYear()}`
  const weekPrices = useSelector((state: RootState) => state.weeklyPrices.prices)[key]?.prices ?? []

  function savePrices(result: FormResult) {
    const now = moment()
    const prices = Array.from(new Array(14)).map((v, k) => result.prices[k])
    const record = {
      year: now.year(),
      week: now.weekYear(),
      prices,
    }
    dispatch(SaveWeeklyPrices(record))
  }

  return (
    <div>
      <WeekPriceForm onSubmit={savePrices} prices={weekPrices} />
      <WeekPriceHistoryGraph />
      <PriceHistoryGraph />
      <PriceAnalyzer />
    </div>
  )
}

export default Component
