import React from 'react';
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'

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

export interface FormValues {
  price: number
}

interface Props {
  onSubmit: (v: FormValues) => any
}

const Component = (props: Props) => (
  <Form
    onSubmit={props.onSubmit}
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

export default Component;
