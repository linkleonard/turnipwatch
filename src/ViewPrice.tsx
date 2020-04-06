import React from 'react'
import { RouteComponentProps } from '@reach/router'

import PriceHistoryGraph from './PriceHistoryGraph'

function Component(props: RouteComponentProps) {
  return (
    <div>
      <PriceHistoryGraph />
    </div>
  )
}

export default Component
