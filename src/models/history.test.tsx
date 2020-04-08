import parsePriceHistory from './history'

const reference = new Date("2020-01-01T00:00:00Z")
const snapshot = {timestamp: reference, price: 3}

test('parsePriceHistory with no snapshots', () => {
  const results = parsePriceHistory([], reference, 1)
  expect(results.items).toEqual([{
    timestamp: reference,
    price: null,
  }])
})

test('parsePriceHistory with one matching snapshot', () => {
  const results = parsePriceHistory([snapshot], reference, 1)
  expect(results.items).toEqual([snapshot])
})

test('parsePriceHistory with multiple matching snapshots', () => {
  const early = {...snapshot, price: 2}
  const results = parsePriceHistory([early, snapshot], reference, 1)
  expect(results.items).toEqual([snapshot])
})

test('parsePriceHistory with sequence of snapshots', () => {
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
  const results = parsePriceHistory(snapshots, snapshots[0].timestamp, 2)
  expect(results.items).toEqual(snapshots)
})

test('parsePriceHistory with multiple sequences of snapshots', () => {
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
  const results = parsePriceHistory(snapshots, snapshots[0].timestamp, 2)
  expect(results.items).toEqual([snapshots[1], snapshots[3]])
})

test('parsePriceHistory with missing snapshots', () => {
  const snapshots = [
    {
      timestamp: new Date("2020-01-01T12:00:00Z"),
      price: 5,
    },
  ]
  const results = parsePriceHistory(snapshots, reference, 2)
  expect(results.items).toEqual([
    {
      timestamp: reference,
      price: null,
    },
    snapshots[0],
  ])
})
