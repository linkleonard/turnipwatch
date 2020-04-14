import { IPriceStore } from './types'
import { WeekPriceRecord } from 'models'

export default function NoopApi(): IPriceStore {
  return {
    save(r: WeekPriceRecord) {
      return new Promise((res, rej) => res())
    },
    get() {
      return new Promise(res => res(undefined))
    },
    list() {
      return new Promise((res, rej) => res([]))
    }
  }
}
