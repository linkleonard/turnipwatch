import NoopApi from './noop'

const api = NoopApi()

test("add succeeds", () => {
  const snapshot = {
    price: 10, 
    timestamp: new Date('2020-01-01T00:00:00Z'),
  }
  api.add(snapshot).then(value => {
    expect(value).toBeUndefined()
  })
})

test("list succeeds", () => {
  api.list().then(value => {
    expect(value).toEqual([])
  })
})
