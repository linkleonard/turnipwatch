import { Behavior, Pattern, MaybePrice } from 'models'
import { decreasingMatcher } from './matchers'

export function analyze(prices: MaybePrice[]): Behavior {
  const isDecreasing = decreasingMatcher(prices.filter((p): p is number => p !== null))

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
