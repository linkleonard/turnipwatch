import { fromSnapshots } from './PriceHistory'

const reference = new Date("2020-01-01T00:00:00Z")
const snapshot = {timestamp: reference, price: 3}

test('fromSnapshots with no snapshots', () => {
  const results = fromSnapshots([], reference, 1)
  expect(results.items).toEqual([{
    timestamp: reference,
    price: null,
  }])
})

test('fromSnapshots with one matching snapshot', () => {
  const results = fromSnapshots([snapshot], reference, 1)
  expect(results.items).toEqual([snapshot])
})

test('fromSnapshots with multiple matching snapshots', () => {
  const early = {...snapshot, price: 2}
  const results = fromSnapshots([early, snapshot], reference, 1)
  expect(results.items).toEqual([snapshot])
})

test('fromSnapshots with sequence of snapshots', () => {
  const snapshots = [
    {
      timestamp: new Date("2020-01-01T00:00:00Z"),
      price: 3,
    },
    {
      timestamp: new Date("2020-01-01T12:00:00Z"),
      price: 4,
    },
  ]
  const results = fromSnapshots(snapshots, snapshots[0].timestamp, 2)
  expect(results.items).toEqual(snapshots)
})

test('fromSnapshots with multiple sequences of snapshots', () => {
  const snapshots = [
    {
      timestamp: new Date("2020-01-01T00:00:00Z"),
      price: 3,
    },
    {
      timestamp: new Date("2020-01-01T00:00:00Z"),
      price: 4,
    },
    {
      timestamp: new Date("2020-01-01T12:00:00Z"),
      price: 5,
    },
    {
      timestamp: new Date("2020-01-01T12:00:00Z"),
      price: 6,
    },
  ]
  const results = fromSnapshots(snapshots, snapshots[0].timestamp, 2)
  expect(results.items).toEqual([snapshots[1], snapshots[3]])
})

test('fromSnapshots with missing snapshots', () => {
  const snapshots = [
    {
      timestamp: new Date("2020-01-01T12:00:00Z"),
      price: 5,
    },
  ]
  const results = fromSnapshots(snapshots, reference, 2)
  expect(results.items).toEqual([
    {
      timestamp: reference,
      price: null,
    },
    snapshots[0],
  ])
})
