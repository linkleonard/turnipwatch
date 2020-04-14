import moment from 'moment'
import React from 'react'
import { Point } from 'chart.js'
import { useSelector } from 'react-redux'

import Graph, { } from 'components/Graph'
import { RootState } from 'redux/reducers'
import { daysOfWeek } from 'utils/time'


const labelLookup = new Map<Number, string>(daysOfWeek.map((v, k) => [k * 2, v]))

function domainToLabel(x: number): string {
  return labelLookup.get(x) ?? ""
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
  const weekPrices = useSelector((state: RootState) => state.weeklyPrices.prices)[key]?.prices ?? []

  return (
    <div>
      <Graph
        label="Price"
        domain={domain}
        convertLabel={domainToLabel}
        dataset={toDataset(weekPrices)}
      />
    </div>
  )
}

export default Component
