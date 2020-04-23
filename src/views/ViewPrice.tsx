import React from 'react'
import { RouteComponentProps, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import WeekPriceHistoryGraph from './WeekPriceHistoryGraph'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/reducers'
import { EmptyPriceRecord } from 'models'

const Container = styled.section`
padding: 20px 0 50px 0;
`

interface RouteProps {
  year?: string,
  week?: string,
}

function Component(props: RouteComponentProps) {
  const { year, week } = useRouteMatch<RouteProps>("/price/me/:year/:week")?.params || {}
  const key = `${year}-${week}`
  const priceRecord = useSelector((state: RootState) => state.weeklyPrices.prices)[key]?.record ?? EmptyPriceRecord

  return (
    <Container>
      <WeekPriceHistoryGraph priceRecord={priceRecord} />
    </Container>
  )
}

export default Component
