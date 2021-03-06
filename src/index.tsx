import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

import App from './App'
import * as serviceWorker from './serviceWorker'
import { rootReducer } from "./redux/reducers"

import './index.css'
import rootSaga from './sagas'
import { HashRouter } from 'react-router-dom'

dayjs.extend(isoWeek)

const composeEnhancers = composeWithDevTools({})
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
