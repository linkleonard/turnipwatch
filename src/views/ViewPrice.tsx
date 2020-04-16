import React from 'react'
import { RouteComponentProps } from '@reach/router'
import styled from 'styled-components'

import WeekPriceHistoryGraph from './WeekPriceHistoryGraph'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/reducers'
import { EmptyPriceRecord } from 'models'

const Container = styled.section`
padding: 20px 0 50px 0;
`

interface RouteProps extends RouteComponentProps {
  year?: number,
  week?: number,
}

function Component(props: RouteProps) {
  const { year, week } = props
  const key = `${year}-${week}`
  const priceRecord = useSelector((state: RootState) => state.weeklyPrices.prices)[key]?.record ?? EmptyPriceRecord

  return (
    <Container>
      <WeekPriceHistoryGraph priceRecord={priceRecord} />
    </Container>
  )
}

export default Component
