import React from 'react';
import { RouteComponentProps } from '@reach/router'
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'

import { AddPrice } from './redux/actions';
import NumberInput from './components/NumberInput';

const SubmitButton = styled.button`
grid-column: 1 / -1;
`

const FormInput = styled.input`
padding: 10px 5px;
`

const StyledForm = styled.form`
display: grid;
grid-template-columns: 1fr 2fr;
grid-gap: 40px 20px;
margin: 20px;
`

interface FormValues {
  price: number
}

function Component(props: RouteComponentProps) {
  const dispatch = useDispatch()
  const onSubmit = (formValues: FormValues) => {
    dispatch(AddPrice(formValues.price, new Date()));
  }
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
      <StyledForm onSubmit={handleSubmit}>
          <label>Current Turnip Price</label>
          <Field 
            name="price" 
            placeholder="Current Price" 
            component={NumberInput(FormInput)}
          />
          <SubmitButton type="submit">Submit</SubmitButton>
        </StyledForm>
      )}
    />
  );
}

export default Component;
