import React from 'react'
import { Point } from 'chart.js'

import Graph, { } from 'components/Graph'
import { submittableDays } from 'utils/time'
import { IPriceRecord } from 'models'

function domainToLabel(x: number): string {
  const day = submittableDays[(Math.floor(x / 2))]
  const timeOfDay = x % 2 === 0 ? "AM" : "PM"
  return `${day} ${timeOfDay}`
}

const domain = {
  min: 0,
  max: 14,
}

function toDataset(prices: (number | null)[]): Point[] {
  return prices.map((v, k) => ({
    x: k,
    y: v,
  })).filter((v): v is Point => v !== null)
}

interface WeekPriceHistoryGraphProps {
  priceRecord: IPriceRecord
}

function Component(props: WeekPriceHistoryGraphProps) {
  return (
    <div>
      <Graph
        label="Price"
        domain={domain}
        convertLabel={domainToLabel}
        dataset={toDataset(props.priceRecord.prices)}
      />
    </div>
  )
}

export default Component
