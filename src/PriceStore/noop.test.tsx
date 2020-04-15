import NoopApi from './noop'

const api = NoopApi()

test("save succeeds", () => {
  const weekRecord = {
    year: 2020,
    week: 20,
    record: {
      buyPrice: 10,
      prices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }
  }
  api.save(weekRecord).then(value => {
    expect(value).toBeUndefined()
  })
})

test("get succeeds", () => {
  api.get(2020, 1).then(value => {
    expect(value).toEqual([])
  })
})


test("list succeeds", () => {
  api.list().then(value => {
    expect(value).toEqual([])
  })
})
