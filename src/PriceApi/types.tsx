import { PriceSnapshot } from 'models'

export interface IPriceApi {
  add(s: PriceSnapshot): Promise<void>
  list(): Promise<PriceSnapshot[]>
}
