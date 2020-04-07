import { PriceHistorySnapshot } from '../types'

export enum Pattern {
  Random = "random",
  Decreasing = "decreasing",
  SmallSpike = "smallSpike",
  CamelHump = "camel",
  InsufficientData = "insufficientData",
  Unknown = "unknown",
}

export type BehaviorMatcher = (s: PriceHistorySnapshot[]) => boolean

export interface Behavior {
  pattern: Pattern,
  recommendation: string,
}
