import { PriceHistorySnapshot } from '../types'
import { Behavior, Pattern } from './types'

export function analyze(snapshots: PriceHistorySnapshot[]): Behavior {
  const withPrices = snapshots.filter(s => s.price !== null)

  const enoughSamples = withPrices.length < 4
  if (!enoughSamples) {
    
  }
  const pattern = Pattern.Unknown
  const recommendation = "We don't know what's going on!"
  return {
    pattern,
    recommendation,
  }
}
