import _ from 'lodash'
import { PriceSnapshot, PriceHistory, PriceHistorySnapshot } from './types'
import { getSliceDates, getSliceStart } from './TimeSlice'


function generateNullPrices(items: Date[]): PriceHistorySnapshot[] {
  return items.map(s => ({
    timestamp: s,
    price: null,
  }))
}

function getSnapshotsForSlices(slices: Date[], snapshots: PriceSnapshot[]): PriceHistorySnapshot[] {
  // No more requested slices, we are done
  if (slices.length == 0) {
    return [];
  }
  // No more pricing data available
  if (snapshots.length == 0) {
    return generateNullPrices(slices)
  }

  // No more entries with a matching price
  const current = slices[0]
  const matchingIndex = snapshots.findIndex(s => s.timestamp.getTime() === current.getTime())
  if (matchingIndex < 0) {
    return generateNullPrices(slices)
  }

  // Use the price from the latest matching snapshot
  const afterMatching = snapshots.slice(matchingIndex + 1)
  const foundNextPriceIndex = afterMatching.findIndex(s => s.timestamp.getTime() !== current.getTime())
  const nextPriceIndex = (foundNextPriceIndex < 0) ? afterMatching.length : foundNextPriceIndex
  const latestPriceIndex = Math.max(matchingIndex, nextPriceIndex)

  const results = [
    {timestamp: current, price: snapshots[latestPriceIndex].price},
    ...getSnapshotsForSlices(slices.slice(1), snapshots.slice(latestPriceIndex + 1))
  ]

  return results.flat(1)
}

export function fromSnapshots(items: PriceSnapshot[], start: Date, count = 14): PriceHistory {
  const alignedItems = _.chain(items)
    .sortBy(i => i.timestamp)
    .map(i => ({
      ...i,
      timestamp: getSliceStart(i.timestamp, start),
    }))
    .value()
  const sliceDates = getSliceDates(start, count)

  return {
    items: getSnapshotsForSlices(sliceDates, alignedItems),
  }
}
