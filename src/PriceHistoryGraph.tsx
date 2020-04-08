import moment from 'moment'
import React from 'react'
import { Point } from 'chart.js'
import { useSelector } from 'react-redux'

import Graph, { Domain } from './components/Graph'
import { RootState } from './redux/reducers'
import { fromSnapshots } from './PriceHistory'
import { PriceHistorySnapshot, PriceHistory } from 'models'

function toDomain(t: PriceHistorySnapshot, start: Date): number {
  const ms = t.timestamp.getTime() - start.getTime()
  return ms / 60 / 60 / 1000 / 12
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const labelLookup = new Map<Number, string>(daysOfWeek.map((v, k) => [k * 2, v]))

function domainToLabel(x: number): string {
  return labelLookup.get(x) ?? ""
}

function getDomain(history: PriceHistory): Domain {
  const first = history.items[0]
  const start = first.timestamp
  return {
    min: toDomain(first, start),
    max: toDomain(history.items[history.items.length - 1], start),
  }
}

function toDataset(history: PriceHistory): Point[] {
  const start = history.items[0].timestamp
  return history.items.filter(i => i.price !== null).map(i => ({
    x: toDomain(i, start),
    y: i.price!,
  }))
}

function Component() {
  const historyResult = useSelector((state: RootState) => state.price.history)
  // TODO: read this from application state
  const weekStart = moment().startOf('week').toDate()
  const history: PriceHistory = fromSnapshots(historyResult, weekStart)

  return (
    <div>
      <Graph
        label="Price"
        domain={getDomain(history)}
        convertLabel={domainToLabel}
        dataset={toDataset(history)}
      />
    </div>
  )
}

export default Component
