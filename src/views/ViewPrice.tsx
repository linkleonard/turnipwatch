import React from 'react'
import { RouteComponentProps } from '@reach/router'
import styled from 'styled-components'

import PriceAnalyzer from './PriceAnalyzer'
import WeekPriceForm, { FormResult } from './WeekPriceForm'
import WeekPriceHistoryGraph from './WeekPriceHistoryGraph'
import { useDispatch, useSelector } from 'react-redux'
import { SaveWeeklyPrices } from 'redux/actions'
import moment from 'moment'
import { RootState } from 'redux/reducers'

const Container = styled.section`
padding: 20px 0 50px 0;
`

function Component(props: RouteComponentProps) {
  const dispatch = useDispatch()

  const now = moment()
  const key = `${now.year()}-${now.weekYear()}`
  const weekPrices = useSelector((state: RootState) => state.weeklyPrices.prices)[key]?.prices ?? []

  function savePrices(result: FormResult) {
    const now = moment()
    const prices = Array.from(new Array(14)).map((v, k) => result.prices[k])
    const record = {
      year: now.year(),
      week: now.weekYear(),
      prices,
    }
    dispatch(SaveWeeklyPrices(record))
  }

  return (
    <Container>
      <WeekPriceForm onSubmit={savePrices} prices={weekPrices} />
      <WeekPriceHistoryGraph />
      <PriceAnalyzer />
    </Container>
  )
}

export default Component
