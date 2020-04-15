import { WeekPriceRecord } from 'models/pricing'

const weekPriceRecord = new WeekPriceRecord({
  year: 2020,
  week: 1,
  record: {
    buyPrice: 10,
    prices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
})


test('WeekPriceRecord.sanitize should work with complete record', () => {
  expect(WeekPriceRecord.sanitize(JSON.parse(JSON.stringify(weekPriceRecord)))).toEqual(weekPriceRecord)
})
