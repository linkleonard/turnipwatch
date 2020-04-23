import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'

import PriceAnalyzer from './PriceAnalyzer'
import WeekPriceForm from './WeekPriceForm'
import WeekPriceHistoryGraph from './WeekPriceHistoryGraph'
import { useDispatch, useSelector } from 'react-redux'
import { SaveWeeklyPrices } from 'redux/actions'
import { RootState } from 'redux/reducers'
import { IPriceRecord, EmptyPriceRecord } from 'models'
import { keyFromDayjs, yearWeekFromDayjs } from 'utils/time'

const Container = styled.section`
padding: 20px 0 50px 0;
`

function Component(props: RouteComponentProps) {
  const dispatch = useDispatch()

  const key = keyFromDayjs(dayjs())
  const priceRecord = useSelector((state: RootState) => state.weeklyPrices.prices)[key]?.record ?? EmptyPriceRecord

  function savePrices(record: IPriceRecord) {
    const weekRecord = {
      ...yearWeekFromDayjs(dayjs()),
      record,
    }
    dispatch(SaveWeeklyPrices(weekRecord))
  }

  return (
    <Container>
      <WeekPriceForm onSubmit={savePrices} priceRecord={priceRecord} />
      <WeekPriceHistoryGraph priceRecord={priceRecord} />
      <PriceAnalyzer />
    </Container>
  )
}

export default Component
