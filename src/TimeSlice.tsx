import moment from 'moment'

function* generateRange(count: Number) {
  for (let i = 0; i < count; ++i) {
    yield i
  }
}

export function getSliceDates(start: Date, count: Number): Date[] {
  const startSlice = moment(start)
  return Array.from(generateRange(count))
    .map(i => 12 * i)
    .map(hours => startSlice.clone().add(hours, "hours"))
    .map(m => m.toDate())
}

export function getSliceStart(date: Date, reference: Date): Date {
  const delta: moment.Duration = moment.duration(moment(date).diff(reference))
  const sliceCount = Math.floor(delta.asHours() / 12)
  return moment(reference).add(sliceCount * 12, "hours").toDate()
}
