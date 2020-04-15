import _ from 'lodash'
import { transformValues } from './WeekPriceForm'
import { MaybePrice } from 'models'

const emptyInput = {
  buyPrice: null,
  prices:
    _.chain(new Array(12))
      .map((v, k) => [k, v])
      .keyBy(([k]) => `price-${k}`)
      .mapValues(() => null)
      .value()
}
const emptyPrices: MaybePrice[] = new Array(12).map(v => null)

test('transformValues parses prices', () => {
  const input = {
    ...emptyInput,
    "price-0": "20",
    "price-1": "10",
    "price-2": "40",
    "price-3": "30",
  }

  let prices = [...emptyPrices]
  prices[0] = 20
  prices[1] = 10
  prices[2] = 40
  prices[3] = 30

  const expected = {
    buyPrice: null,
    prices,
  }
  expect(transformValues(input)).toEqual(expected)
})


test('transformValues skips missing prices', () => {
  const input = {
    ...emptyInput,
    "price-0": "20",
    "price-3": "30"
  }
  let prices = [...emptyPrices]
  prices[0] = 20
  prices[3] = 30

  const expected = {
    buyPrice: null,
    prices,
  }

  expect(transformValues(input)).toEqual(expected)
})
