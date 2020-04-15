import { IPriceStore } from './types'
import { IWeekPriceRecord, WeekPriceRecord } from 'models'
import { isNumber } from 'lodash'

const indexKey = "prices-index"


function stringToModel(raw: string): IWeekPriceRecord | null {
  let parsed: string | null = null
  try {
    parsed = JSON.parse(raw)
  } catch (e) {
    console.warn(`Stored price is not valid json: ${raw}`)
    return null
  }

  try {
    return WeekPriceRecord.sanitize(parsed)
  } catch (e) {
    console.warn(`Error deserializing stored price: ${parsed}`)
    return null
  }
}

function recordKey(year: number, week: number): string {
  const weekRaw = `0${week}`
  const weekStr = weekRaw.substr(weekRaw.length - 2)
  return `prices-${year}-${weekStr}`
}

export default function LocalStorageApi(backing = window.localStorage): IPriceStore {
  function readIndex(): Set<string> {
    const indexRaw = backing.getItem(indexKey)
    let index: any | null
    try {
      index = (indexRaw === null) ? [] : JSON.parse(indexRaw)
    } catch (e) {
      console.warn(`Index is not valid json: ${indexRaw}`)
      return new Set()
    }

    if (!(index instanceof Array)) {
      console.warn("Index corrupted")
      return new Set()
    }
    return new Set(index.map(i => i.toString()))
  }
  function writeIndex(keys: Set<string>) {
    backing.setItem(indexKey, JSON.stringify(Array.from(keys)))
  }
  return {
    save(r: IWeekPriceRecord) {
      return new Promise((res) => {
        const index = readIndex()
        const key = recordKey(r.year, r.week)
        const payload = JSON.stringify(r)
        backing.setItem(key, payload)
        console.log("Saved to storage")
        writeIndex(index.add(key))
        console.log("Updated index")
        res(undefined)
      })
    },
    get(year: number, month: number) {
      return new Promise((res) => {
        const key = recordKey(year, month)
        const raw = backing.getItem(key)
        if (raw === null) {
          return undefined
        }
        const payload = JSON.parse(raw)
        res(payload)
      })
    },
    list() {
      return new Promise((res, rej) => {
        let index = readIndex()
        const deserialized =
          Array.from(index.values())
            .map(k => backing.getItem(k))
            .filter((v): v is string => v !== null)
            .map(stringToModel)
            .filter((v): v is IWeekPriceRecord => v !== null)
        res(deserialized)
      })
    }
  }
}
