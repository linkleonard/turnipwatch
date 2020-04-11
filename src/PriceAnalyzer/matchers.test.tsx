import { decreasingMatcher } from './matchers'

const Prices = {
  Decreasing: [10, 9, 8, 7],
  Increasing: [1, 2, 3, 4],
  Fixed: [2, 2, 2, 2],
  V: [10, 9, 8, 9, 10],
  InverseV: [1, 2, 3, 2, 1],
  Wave: [1, 2, 3, 4, 3, 2, 1, 2, 3, 4],
}

test('Decreasing handles decreasing sequence', () => {
  expect(decreasingMatcher(Prices.Decreasing)).toBeTruthy()
})

test('Decreasing handles increasing sequence', () => {
  expect(decreasingMatcher(Prices.Increasing)).toBeFalsy()
})

test('Decreasing handles fixed sequence', () => {
  expect(decreasingMatcher(Prices.Fixed)).toBeFalsy()
})

test('Decreasing handles V sequence', () => {
  expect(decreasingMatcher(Prices.V)).toBeFalsy()
})

test('Decreasing handles ^ sequence', () => {
  expect(decreasingMatcher(Prices.InverseV)).toBeFalsy()
})

test('Decreasing handles wave sequence', () => {
  expect(decreasingMatcher(Prices.Wave)).toBeFalsy()
})
