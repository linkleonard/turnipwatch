import React from 'react'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, fireEvent } from '@testing-library/react';

import { rootReducer } from "./redux/reducers";
import App from './App';
import { renderWithRouter } from 'utils/tests'


const store = createStore(rootReducer);

test('submit new price', async () => {
  const rendered = renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const {
    container,
    history: { navigate },
    getByPlaceholderText,
    getByText,
  } = rendered

  await navigate("/price/add")
  fireEvent.change(getByPlaceholderText("Current Price"), {target: {value: "35"}})
  fireEvent.click(getByText("Submit"), {target: {value: "35"}})
});

test('View prices', async () => {
  const rendered = renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const {
    container,
    history: { navigate },
  } = rendered

  await navigate("/price/me")
});
