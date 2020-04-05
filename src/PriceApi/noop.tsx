import { PriceApi } from './types'
import { PriceSnapshot } from '../types'

export default function NoopApi(): PriceApi {
  return {
    add(s: PriceSnapshot) {
      return new Promise((res, rej) => res())
    },
    list() {
      return new Promise((res, rej) => res([]))
    }
  }
}
