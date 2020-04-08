export enum Pattern {
  Random = "random",
  Decreasing = "decreasing",
  SmallSpike = "smallSpike",
  CamelHump = "camel",
  InsufficientData = "insufficientData",
  Unknown = "unknown",
}

export interface Behavior {
  pattern: Pattern,
  recommendation: string,
}
