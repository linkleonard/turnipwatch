import React from 'react'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, fireEvent } from '@testing-library/react';

import { rootReducer } from "./redux/reducers";
import App from './App';


const store = createStore(rootReducer);

test('submit new price', () => {
  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  fireEvent.change(getByPlaceholderText("Current Price"), {target: {value: "35"}})
  fireEvent.click(getByText("Submit"), {target: {value: "35"}})
});
