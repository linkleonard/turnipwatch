import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form'

import { AddPrice } from './redux/actions';
import NumberInput from './components/NumberInput';

interface FormValues {
  price: Number
}

function Component() {
  const dispatch = useDispatch()
  const onSubmit = (formValues: FormValues) => {
    dispatch(AddPrice(formValues.price, new Date()));
  }
  return (
    <Form 
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <label>Current Turnip Price</label>
          <Field name="price" component={NumberInput} placeholder="Current Price" />
          <button type="submit">Submit</button>
        </form>
      )}
    />
  );
}

export default Component;
