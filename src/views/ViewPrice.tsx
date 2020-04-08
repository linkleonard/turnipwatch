import React from 'react'
import { RouteComponentProps } from '@reach/router'

import PriceHistoryGraph from './PriceHistoryGraph'
import PriceAnalyzer from './PriceAnalyzer'

function Component(props: RouteComponentProps) {
  return (
    <div>
      <PriceHistoryGraph />
      <PriceAnalyzer />
    </div>
  )
}

export default Component
