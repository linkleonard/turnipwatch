import { getSliceStart } from './PriceHistory'

test("getSliceStart with same value", () => {
  const reference = new Date('2020-01-01T00:00:00Z')
  expect(getSliceStart(reference, reference)).toEqual(reference)
})

test("getSliceStart in same slice", () => {
  const reference = new Date('2020-01-01T00:00:00Z')
  const time = new Date('2020-01-01T03:00:00Z')
  expect(getSliceStart(time, reference)).toEqual(reference)
})

test("getSliceStart in next slice", () => {
  const reference = new Date('2020-01-01T00:00:00Z')
  const time = new Date('2020-01-01T13:00:00Z')
  const expected = new Date('2020-01-01T12:00:00Z')
  expect(getSliceStart(time, reference)).toEqual(expected)
})

test("getSliceStart in different timezone", () => {
  const reference = new Date('2020-01-01T00:00:00Z')
  const time = new Date('2020-01-01T13:00:00-04:00:00')
  // Actual time difference is 8h, so should be floored to reference time
  expect(getSliceStart(time, reference)).toEqual(reference)
})
