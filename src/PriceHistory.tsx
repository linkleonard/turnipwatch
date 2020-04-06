import moment, { parseTwoDigitYear, duration } from 'moment'
import { PriceSnapshot, PriceHistory, PriceHistorySnapshot } from './types'

function orderByTimestamp(a: PriceSnapshot, b: PriceSnapshot): number {
  return a.timestamp.getTime() - b.timestamp.getTime()
}

export function getSliceDates(start: Date, count: Number): Date[] {
  const startSlice = moment(start)
  return Array(count).map((_, count) => 12 * count)
    .map(hours => startSlice.clone().add(hours, "hours"))
    .map(m => m.toDate())
}

export function getSliceStart(date: Date, reference: Date): Date {
  const delta: moment.Duration = moment.duration(moment(date).diff(reference))
  const sliceCount = Math.floor(delta.asHours() / 12)
  return moment(reference).add(sliceCount * 12, "hours").toDate()
}

function getSnapshotsForSlices(slices: Date[], snapshots: PriceSnapshot[]): PriceHistorySnapshot[] {
  // No more requested slices, we are done
  if (slices.length == 0) {
    return [];
  }
  // No more pricing data available
  if (snapshots.length == 0) {
    return slices.map(s => ({
      timestamp: s,
      price: null,
    }))
  }

  const current = slices[0]
  const index = snapshots.findIndex(s => s.timestamp === current)
  if (index < 0) {
    return slices.map(s => ({
      timestamp: s,
      price: null,
    }))
  }

  const results = [
    {timestamp: current, price: snapshots[index].price},
    ...getSnapshotsForSlices(slices.slice(1), snapshots.slice(index))
  ]

  return results.flat(1)
}

export function fromSnapshots(items: PriceSnapshot[], start: Date): PriceHistory {
  const alignedItems = 
    items.sort(orderByTimestamp)
      .map(i => ({
        ...i,
        timestamp: getSliceStart(i.timestamp, start),
      }))
  const startTime = moment(start).startOf('day').toDate()
  const sliceDates = getSliceDates(startTime, 14)

  return {
    items: getSnapshotsForSlices(sliceDates, alignedItems),
  }
}
