import { transformValues } from './WeekPriceForm'

test('transformValues parses prices', () => {
  const input = {
    "price-0": "20",
    "price-1": "10",
    "price-2": "40",
    "price-3": "30",
  }
  const expected = {
    0: 20, 
    1: 10,
    2: 40,
    3: 30,
  }
  expect(transformValues(input)).toEqual(expected)
})


test('transformValues skips missing prices', () => {
  const input = {
    "price-0":  "20", 
    "price-3": "30"
  }
  const expected = {
    0: 20, 
    3: 30,
  }
  expect(transformValues(input)).toEqual(expected)
})
