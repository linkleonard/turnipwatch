import dayjs from 'dayjs'
import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'redux/reducers'
import { analyze } from 'PriceAnalyzer/analyzer'

function Component() {
  // TODO: read this from application state
  const now = dayjs()
  const key = `${now.isoWeekYear()}-${now.isoWeek()}`
  const weekPrices = useSelector((state: RootState) => state.weeklyPrices.prices)[key]?.record.prices ?? []

  const behavior = analyze(weekPrices)

  return <div>{behavior.recommendation}</div>
}

export default Component
