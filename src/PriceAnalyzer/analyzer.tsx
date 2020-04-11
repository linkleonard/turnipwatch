import { Behavior, Pattern, PriceHistorySnapshot } from 'models'
import { decreasingMatcher } from './matchers'
import { SSL_OP_NO_COMPRESSION } from 'constants'

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

export function analyze(snapshots: PriceHistorySnapshot[]): Behavior {
  const prices: number[] = snapshots.map(s => s.price).filter(notEmpty)
  const isDecreasing = decreasingMatcher(prices)

  const pattern = isDecreasing ? Pattern.Decreasing : Pattern.Unknown

  return {
    pattern,
    recommendation: getRecommendation(pattern),
  }
}


function getRecommendation(pattern: Pattern): string {
  switch(pattern) {
    case Pattern.Decreasing:
      return "You should sell. Prices are unlikely to rise."
    default: 
      return "We have no idea what's going on."
  }
}
