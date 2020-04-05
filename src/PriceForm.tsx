import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Form, Field } from 'react-final-form'

import { RootState } from './reducers';
import { AddPrice } from './actions';
import NumberInput from './NumberInput';

const mapState = (state: RootState) => ({
  history: state.price.history,
})

const mapDispatch = () => ({
  addPrice: AddPrice,
})

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

interface FormValues {
  price: Number;
}

function Component(props: Props) {
  const onSubmit = (formValues: FormValues) => {
    props.addPrice(formValues.price, new Date());
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

export default connector(Component);
