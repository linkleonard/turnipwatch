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


function toKey(year: number, week: number): string {
  return `${year}-${week}`
}

export function keyFromYearWeek(yearWeek: YearWeek): string {
  return toKey(yearWeek.year, yearWeek.week)
}

export function keyFromDayjs(time: Dayjs): string {
  return toKey(time.isoWeekYear(), time.isoWeek())
}

export function yearWeekFromDayjs(time: Dayjs): YearWeek {
  return {
    year: time.isoWeekYear(),
    week: time.isoWeek(),
  }
}
