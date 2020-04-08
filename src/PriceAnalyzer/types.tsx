import { PriceHistorySnapshot } from 'models'

export type BehaviorMatcher = (s: PriceHistorySnapshot[]) => boolean
