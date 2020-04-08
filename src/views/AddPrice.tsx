import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import styled from 'styled-components'

import { AddPrice as AddPriceAction } from 'redux/actions';
import { RootState } from 'redux/reducers'
import PriceForm, { FormValues } from './PriceForm'
import { isSameSlice, sliceName } from '../TimeSlice'

const Warning = styled.div`
background-color: rgb(255, 255, 153);
box-shadow: 5px 5px 3px rgba(173, 173, 73, 0.3);
padding: 20px;

&:before {
  content: "⚠️";
  margin-right: 8px;
  font-size: 20px;
}
`

const StyledSection = styled.section`
display: flex;
flex-flow: column;
align-items: center;

> ${Warning} {
  flex: 1 0 100%;
}

> * {
  flex: 1 1 auto;
  max-width: 800px;
}
`

function PriceDuplicateChecker(): JSX.Element | null {
  const reference = moment().startOf('week').toDate()
  const history = useSelector((state: RootState) => state.price.history)
  const lastSnapshot = history[history.length - 1]
  const hasExistingPrice = (lastSnapshot !== undefined) && isSameSlice(lastSnapshot.timestamp, new Date(), reference)
  if (hasExistingPrice) {
    return <Warning>You've already submitted a price of {lastSnapshot.price} 🔔 for {sliceName(lastSnapshot.timestamp)}.</Warning>
  }
  return null
}

export default function AddPrice(props: RouteComponentProps) {
  const dispatch = useDispatch()
  const onSubmit = (formValues: FormValues) => {
    dispatch(AddPriceAction(formValues.price, new Date()));
  }
  return (
    <StyledSection>
      <PriceDuplicateChecker />
      <PriceForm onSubmit={onSubmit} />
    </StyledSection>
  );
}
