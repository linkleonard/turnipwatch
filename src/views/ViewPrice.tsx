import React from 'react'
import { RouteComponentProps } from '@reach/router'
import styled from 'styled-components'

import PriceAnalyzer from './PriceAnalyzer'
import WeekPriceForm from './WeekPriceForm'
import WeekPriceHistoryGraph from './WeekPriceHistoryGraph'
import { useDispatch, useSelector } from 'react-redux'
import { SaveWeeklyPrices } from 'redux/actions'
import moment from 'moment'
import { RootState } from 'redux/reducers'
import { IPriceRecord, EmptyPriceRecord } from 'models'

const Container = styled.section`
padding: 20px 0 50px 0;
`

function Component(props: RouteComponentProps) {
  const dispatch = useDispatch()

  const now = moment()
  const key = `${now.year()}-${now.weekYear()}`
  const priceRecord = useSelector((state: RootState) => state.weeklyPrices.prices)[key]?.record ?? EmptyPriceRecord

  function savePrices(record: IPriceRecord) {
    const now = moment()

    const weekRecord = {
      year: now.year(),
      week: now.weekYear(),
      record,
    }
    dispatch(SaveWeeklyPrices(weekRecord))
  }

  return (
    <Container>
      <WeekPriceForm onSubmit={savePrices} priceRecord={priceRecord} />
      <WeekPriceHistoryGraph />
      <PriceAnalyzer />
    </Container>
  )
}

export default Component
