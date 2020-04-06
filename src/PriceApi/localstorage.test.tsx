import LocalStorageApi from './localstorage'
import MemoryStorage from "../utils/MemoryStorage"

const storageKey = "snapshots"

const spies = [
  jest.spyOn(window.console, "log"),
  jest.spyOn(window.console, "error"),
  jest.spyOn(window.console, "warn"),
]
spies.forEach(spy => spy.mockImplementation())
afterAll(() => spies.forEach(spy => spy.mockRestore()))

const snapshot = {
  price: 10, 
  timestamp: new Date('2020-01-01T00:00:00Z'),
}

test("add succeeds", () => {
  const storage = MemoryStorage()
  const api = LocalStorageApi(storage)
  const addSnapshot = api.add(snapshot)

  const checkStorage = addSnapshot.then(() => {
    const stored = storage.getItem(storageKey)
    if (stored === null) {
      throw new TypeError(`Found null in "${storageKey}"`)
    }
    return expect(stored).toEqual(JSON.stringify([snapshot]))
  })
  return Promise.all([
    expect(addSnapshot).resolves.toBeUndefined,
    checkStorage,
  ])
})

test("add with existing data succeeds", () => {
  const storage = MemoryStorage()
  storage.setItem(storageKey, JSON.stringify([snapshot]))

  const api = LocalStorageApi(storage)
  const addSnapshot = api.add(snapshot)

  const checkStorage = addSnapshot.then(() => {
    const stored = storage.getItem(storageKey)
    if (stored === null) {
      throw new TypeError(`Found null in "${storageKey}"`)
    }
    return expect(stored).toEqual(JSON.stringify([snapshot, snapshot]))
  })
  return Promise.all([
    expect(addSnapshot).resolves.toBeUndefined,
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
  storage.setItem(storageKey, JSON.stringify([snapshot]))
  const api = LocalStorageApi(storage)
  return expect(api.list())
    .resolves
    .toContainEqual(snapshot)
})

test("list fails when invalid json is stored", () => {
  const storage = MemoryStorage()
  storage.setItem(storageKey, "derp")
  const api = LocalStorageApi(storage)
  const spy = jest.spyOn(window.console, "error").mockImplementation()

  return expect(api.list())
    .rejects.toThrow()
    .finally(() => spy.mockRestore())
})

test("list skips over invalid timestamps", () => {
  const storage = MemoryStorage()
  const item = {price: 30, timestamp: null}
  storage.setItem(storageKey, JSON.stringify([item]))
  const api = LocalStorageApi(storage)

  return expect(api.list())
    .resolves.toEqual([])
})

test("list skips over malformed items", () => {
  const storage = MemoryStorage()
  storage.setItem(storageKey, JSON.stringify(["not a snapshot", snapshot]))
  const api = LocalStorageApi(storage)

  return expect(api.list())
    .resolves.toEqual([snapshot])
})
