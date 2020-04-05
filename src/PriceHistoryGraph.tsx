import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from './redux/reducers'

function Component() {
  const historyResult = useSelector((state: RootState) => state.price.history)

  return (
    <div>
      <ul>
        {historyResult.map(s => 
          <li key={s.timestamp.getTime()}>{s.timestamp.getTime()} {s.price}</li>
        )}
      </ul>
    </div>
  )
}

export default Component
