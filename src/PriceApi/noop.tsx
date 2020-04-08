import { IPriceApi } from './types'
import { PriceSnapshot } from 'models'

export default function NoopApi(): IPriceApi {
  return {
    add(s: PriceSnapshot) {
      return new Promise((res, rej) => res())
    },
    list() {
      return new Promise((res, rej) => res([]))
    }
  }
}
