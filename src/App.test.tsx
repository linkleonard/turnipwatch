import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { createStore } from 'redux'
import { fireEvent, render } from '@testing-library/react'

import { rootReducer } from "./redux/reducers"
import App from './App'
import { LoadWeeklyPrices } from 'redux/actions'
import { WeekPriceRecord } from 'models'


const store = createStore(rootReducer)

test('View current price with no history', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/price/me"]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
})

test('View current price then edit', async () => {
  const rendered = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/price/me"]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
  const {
    getByLabelText,
    getByText,
  } = rendered

  fireEvent.change(getByLabelText("Monday AM"), { target: { value: "35" } })
  fireEvent.click(getByText("Submit"))
})

test('View historic prices', async () => {
  const weekPriceRecord = new WeekPriceRecord({
    year: 2020,
    week: 15,
    record: {
      buyPrice: 10,
      prices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  })
  const store = createStore(rootReducer)
  store.dispatch(LoadWeeklyPrices([weekPriceRecord]))

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/price/me/2020/15"]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
})
