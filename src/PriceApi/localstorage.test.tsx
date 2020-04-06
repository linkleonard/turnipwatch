import LocalStorageApi from './localstorage'
import { stringify } from 'querystring';

function GetFakeLocalStorage(): Storage {
  const store = new Map<string, string>();
  
  return {
    getItem(key: string) {
      const value = store.get(key)
      if (value === undefined) {
        return null
      }
      return value
    },
    get length() {
      return store.size;
    },
    clear: store.clear,
    removeItem: store.delete,
    setItem(key: string, value: string) {
      store.set(key, value)
    },
    // Not implemented because its unused
    key(index: number): string | null {
      return null
    }
  }
}

test("add succeeds", () => {
  const api = LocalStorageApi(GetFakeLocalStorage())
  const snapshot = {
    price: 10, 
    timestamp: new Date('2020-01-01T00:00:00Z'),
  }
  api.add(snapshot).then(value => {
    expect(value).toBeUndefined()
  })
})

test("list succeeds", () => {
  const api = LocalStorageApi(GetFakeLocalStorage())
  api.list().then(value => {
    expect(value).toEqual([])
  })
})

test("list fails when invalid json is stored", () => {
  const storage = GetFakeLocalStorage()
  storage.setItem("snapshots", "derp")
  const api = LocalStorageApi(storage)
  const spy = jest.spyOn(window.console, "error").mockImplementation()

  return expect(api.list())
    .rejects.toThrow()
    .finally(() => spy.mockRestore())
})

test("list skips over invalid timestamps", () => {
  const storage = GetFakeLocalStorage()
  const item = {price: 30, timestamp: null}
  storage.setItem("snapshots", JSON.stringify([item]))
  const api = LocalStorageApi(storage)
  const spy = jest.spyOn(window.console, "warn").mockImplementation()

  return expect(api.list())
    .resolves.toEqual([])
    .finally(() => spy.mockRestore())
})

test("list skips over malformed items", () => {
  const storage = GetFakeLocalStorage()
  storage.setItem("snapshots", JSON.stringify(["not a snapshot"]))
  const api = LocalStorageApi(storage)
  const spy = jest.spyOn(window.console, "warn").mockImplementation()

  return expect(api.list())
    .resolves.toEqual([])
    .finally(() => spy.mockRestore())
})

test("list after add succeeds", () => {
  const api = LocalStorageApi(GetFakeLocalStorage())
  const snapshot = {
    price: 10, 
    timestamp: new Date('2020-01-01T00:00:00Z'),
  }
  api.add(snapshot)
    .then(() => {
      api.list().then(items => {
        expect(items).toContainEqual(snapshot)
      })
    })
})