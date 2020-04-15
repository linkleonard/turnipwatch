import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'redux/reducers'
import { analyze } from 'PriceAnalyzer/analyzer'

function Component() {
  // TODO: read this from application state
  const now = moment()
  const key = `${now.year()}-${now.weekYear()}`
  const weekPrices = useSelector((state: RootState) => state.weeklyPrices.prices)[key]?.record.prices ?? []

  const behavior = analyze(weekPrices)

  return <div>{behavior.recommendation}</div>
}

export default Component
