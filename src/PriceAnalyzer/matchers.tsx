export function decreasingMatcher(prices: number[]): number {
  return findIncreasingIndex(prices) === undefined ? 1.0 : 0
}

function findIncreasingIndex(prices: number[]): number | undefined {
  const found = prices.slice(1).find((val, index) => prices[index] <= val)
  if (found !== undefined) {
    return found + 1
  }
  return undefined
}
