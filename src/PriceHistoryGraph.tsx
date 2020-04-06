import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from './redux/reducers'
import { fromSnapshots } from './PriceHistory'
import { PriceHistorySnapshot, PriceHistory } from './types'

function Component() {
  const historyResult = useSelector((state: RootState) => state.price.history)
  // TODO: read this from application state
  const weekStart = moment().startOf('week').toDate()
  const history: PriceHistory = fromSnapshots(historyResult, weekStart)

  return (
    <div>
      <ul>
        {history.items.map(s => 
          <li key={s.timestamp.getTime()}>{s.timestamp.toString()} {s.price}</li>
        )}
      </ul>
    </div>
  )
}

export default Component
