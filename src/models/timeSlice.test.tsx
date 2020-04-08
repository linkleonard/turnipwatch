import { getSliceDates, getSliceStart } from './TimeSlice'

const reference = new Date('2020-01-01T00:00:00Z')

test("getSliceDates with count = 0", () => {
  expect(getSliceDates(reference, 0))
    .toEqual([])
})

test("getSliceDates with count = 1", () => {
  expect(getSliceDates(reference, 1))
    .toEqual([reference])
})

test("getSliceDates with count = 3", () => {
  expect(getSliceDates(reference, 3))
    .toEqual([
      new Date('2020-01-01T00:00:00Z'),
      new Date('2020-01-01T12:00:00Z'),
      new Date('2020-01-02T00:00:00Z'),
    ])
})

test("getSliceStart with same value", () => {
  expect(getSliceStart(reference, reference)).toEqual(reference)
})

test("getSliceStart in same slice", () => {
  const time = new Date('2020-01-01T03:00:00Z')
  expect(getSliceStart(time, reference)).toEqual(reference)
})

test("getSliceStart in next slice", () => {
  const time = new Date('2020-01-01T13:00:00Z')
  const expected = new Date('2020-01-01T12:00:00Z')
  expect(getSliceStart(time, reference)).toEqual(expected)
})

test("getSliceStart in different timezone", () => {
  const time = new Date('2020-01-01T13:00:00-04:00:00')
  // Actual time difference is 8h, so should be floored to reference time
  expect(getSliceStart(time, reference)).toEqual(reference)
})
