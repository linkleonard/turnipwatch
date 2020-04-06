import { PriceApi } from './types'
import { PriceSnapshot } from '../types'

const storeKey = "snapshots"

function itemToModel(item: any): PriceSnapshot {
  if (Number.isNaN(Number(item.price))) {
    throw new TypeError("price is not a number")
  }
  if (!(item instanceof Object)) {
    throw new TypeError("item is not an object")
  }
  if (item.timestamp === null) {
    throw new TypeError("Timestamp is missing")
  }
  return {
    price: item.price,
    timestamp: new Date(item.timestamp),
  }
}

export default function LocalStorageApi(backing = window.localStorage): PriceApi {
  return {
    add(s: PriceSnapshot) {
      return this.list().then(items => {
        const results = [...items, s]
        const payload = JSON.stringify(results)
        backing.setItem(storeKey, payload)
      })
    },
    list() {
      return new Promise((res, rej) => {
        const stored = backing.getItem(storeKey)
        if (stored === null) {
          return res([])
        }

        try {
          const parsed = JSON.parse(stored)
          if (parsed instanceof Array) {
            const items = parsed.flatMap(item => {
              try {
                return [itemToModel(item)]
              } catch (e) {
                console.warn(`Error deserializing stored snapshot: $e`)
                return []
              }
            })
            res(items)
          } else {
            throw new TypeError("Stored snapshot is not of correct type")
          }
        } catch (e) {
          console.error(`Error deserializing stored snapshots: $e`)
          rej(e)
        }
      })
    }
  }
}
