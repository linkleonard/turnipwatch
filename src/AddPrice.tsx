import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'

import { AddPrice as AddPriceAction } from './redux/actions';
import PriceForm, { FormValues } from './PriceForm'

const StyledSection = styled.section`
display: flex;
justify-content: center;

> * {
  flex: 1 1 auto;
  max-width: 800px;
}
`

export default function AddPrice(props: RouteComponentProps) {
  const dispatch = useDispatch()
  const onSubmit = (formValues: FormValues) => {
    dispatch(AddPriceAction(formValues.price, new Date()));
  }
  return (
    <StyledSection>
      <PriceForm onSubmit={onSubmit} />
    </StyledSection>
  );
}
