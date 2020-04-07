import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from './redux/reducers'
import { fromSnapshots } from './PriceHistory'
import { PriceHistory } from './types'
import { analyze } from './PriceBehavior/analyzer'

function Component() {
  const historyResult = useSelector((state: RootState) => state.price.history)
  // TODO: read this from application state
  const weekStart = moment().startOf('week').toDate()
  const history: PriceHistory = fromSnapshots(historyResult, weekStart)
  const behavior = analyze(history.items)

  return <div>{behavior.recommendation}</div>
}

export default Component
