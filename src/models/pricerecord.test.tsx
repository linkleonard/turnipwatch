import { PriceRecord } from 'models/pricing'


const priceRecord = new PriceRecord({
  buyPrice: 10,
  prices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
})

test('PriceRecord can clone another', () => {
  const cloned = new PriceRecord(priceRecord)
  expect(cloned).not.toBe(priceRecord)
})

test('PriceRecord to create empty elements with the right price count', () => {
  const record = new PriceRecord()
  expect(record.prices).toHaveLength(12)
})

test('sanitize should work with complete record', () => {
  const priceRecord = new PriceRecord({
    buyPrice: 10,
    prices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  })
  const serialized = JSON.stringify(priceRecord)
  expect(PriceRecord.sanitize(JSON.parse(serialized))).toEqual(priceRecord)

})
