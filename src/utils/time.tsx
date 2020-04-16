import { Dayjs } from 'dayjs'

export interface YearWeek {
  year: number,
  week: number,
}
export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export const submittableDays = daysOfWeek.slice(1)

export function keyFromDayjs(time: Dayjs): string {
  return `${time.isoWeekYear()}-${time.isoWeek()}`
}

export function yearWeekFromDayjs(time: Dayjs): YearWeek {
  return {
    year: time.isoWeekYear(),
    week: time.isoWeek(),
  }
}
