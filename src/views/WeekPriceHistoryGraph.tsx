import moment from 'moment'
import React from 'react'
import { Point } from 'chart.js'
import { useSelector } from 'react-redux'

import Graph, { } from 'components/Graph'
import { RootState } from 'redux/reducers'
import { submittableDays } from 'utils/time'

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

function Component() {
  const now = moment()
  // TODO: read this from application state
  const key = `${now.year()}-${now.weekYear()}`
  const prices = useSelector((state: RootState) => state.weeklyPrices.prices)[key]?.record.prices ?? []

  return (
    <div>
      <Graph
        label="Price"
        domain={domain}
        convertLabel={domainToLabel}
        dataset={toDataset(prices)}
      />
    </div>
  )
}

export default Component
