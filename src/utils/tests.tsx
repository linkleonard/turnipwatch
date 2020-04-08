import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  History,
} from '@reach/router'

export interface RenderResultWithHistory extends RenderResult {
  history: History,
}

// Adapted from https://testing-library.com/docs/example-reach-router
export function renderWithRouter(
  ui: JSX.Element,
  {
    route = '/', 
    history = createHistory(createMemorySource(route)),
  } = {},
): RenderResultWithHistory {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}