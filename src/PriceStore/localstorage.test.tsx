import LocalStorageApi from './localstorage'
import MemoryStorage from "../utils/MemoryStorage"

const indexKey = "prices-index"
const storageKey = "prices-2020-20"

const spies = [
  jest.spyOn(window.console, "log"),
  jest.spyOn(window.console, "error"),
  jest.spyOn(window.console, "warn"),
]
spies.forEach(spy => spy.mockImplementation())
afterAll(() => spies.forEach(spy => spy.mockRestore()))

const weekRecord = {
  year: 2020,
  week: 20,
  record: {
    buyPrice: 10,
    prices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  }
}

test("record succeeds", () => {
  const storage = MemoryStorage()
  const api = LocalStorageApi(storage)
  const saveRecord = api.save(weekRecord)

  const checkStorage = saveRecord.then(() => {
    const stored = storage.getItem(storageKey)
    if (stored === null) {
      throw new TypeError(`Found null in "${storageKey}"`)
    }
    return expect(stored).toEqual(JSON.stringify(weekRecord))
  })
  return Promise.all([
    expect(saveRecord).resolves.toBeUndefined,
    checkStorage,
  ])
})

test("add with existing data succeeds", () => {
  const storage = MemoryStorage()
  storage.setItem(storageKey, JSON.stringify(weekRecord))

  const api = LocalStorageApi(storage)
  const saveRecord = api.save(weekRecord)

  const checkStorage = saveRecord.then(() => {
    const stored = storage.getItem(storageKey)
    if (stored === null) {
      throw new TypeError(`Found null in "${storageKey}"`)
    }
    return expect(stored).toEqual(JSON.stringify(weekRecord))
  })
  return Promise.all([
    expect(saveRecord).resolves.toBeUndefined,
    checkStorage,
  ])
})

test("list succeeds for empty storage", () => {
  const api = LocalStorageApi(MemoryStorage())
  return expect(api.list())
    .resolves
    .toEqual([])
})

test("list succeeds with valid json", () => {
  const storage = MemoryStorage()
  storage.setItem(storageKey, JSON.stringify(weekRecord))
  storage.setItem(indexKey, JSON.stringify([storageKey]))
  const api = LocalStorageApi(storage)
  return expect(api.list())
    .resolves
    .toContainEqual(weekRecord)
})

test("list fails when invalid json is stored", () => {
  const storage = MemoryStorage()
  storage.setItem(storageKey, "derp")
  const api = LocalStorageApi(storage)
  const spy = jest.spyOn(window.console, "error").mockImplementation()

  return expect(api.list())
    .resolves.toEqual([])
    .finally(() => spy.mockRestore())
})

test("list skips over invalid timestamps", () => {
  const storage = MemoryStorage()
  const item = { price: 30, timestamp: null }
  storage.setItem(storageKey, JSON.stringify([item]))
  const api = LocalStorageApi(storage)

  return expect(api.list())
    .resolves.toEqual([])
})

test("list skips over malformed items", () => {
  const storage = MemoryStorage()
  const altStorageKey = "price-unknown"
  storage.setItem(storageKey, JSON.stringify(weekRecord))
  storage.setItem(altStorageKey, "Herp derp")
  storage.setItem(indexKey, JSON.stringify([storageKey, altStorageKey]))
  const api = LocalStorageApi(storage)

  return expect(api.list())
    .resolves.toEqual([weekRecord])
})
