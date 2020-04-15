import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { fireEvent } from '@testing-library/react'

import { rootReducer } from "./redux/reducers"
import App from './App'
import { renderWithRouter } from 'utils/tests'


const store = createStore(rootReducer)

test('submit prices', async () => {
  const rendered = renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const {
    history: { navigate },
    getByLabelText,
    getByText,
  } = rendered

  await navigate("/price/me")
  fireEvent.change(getByLabelText("Monday AM"), { target: { value: "35" } })
  fireEvent.click(getByText("Submit"))
})

test('View prices', async () => {
  const rendered = renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const {
    history: { navigate },
  } = rendered

  await navigate("/price/me")
})
