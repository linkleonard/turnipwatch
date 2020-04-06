import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from './redux/reducers'
import { fromSnapshots } from './PriceHistory'
import { PriceHistorySnapshot, PriceHistory } from './types'

function Component() {
  const historyResult = useSelector((state: RootState) => state.price.history)
  // TODO: read this from application state
  const endTime = new Date()
  const history: PriceHistory = {items: historyResult}

  return (
    <div>
      <ul>
        {history.items.map(s => 
          <li key={s.timestamp.getTime()}>{s.timestamp.getTime()} {s.price}</li>
        )}
      </ul>
    </div>
  )
}

export default Component
