import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './reducers';
import { AddPrice } from './actions';

const mapState = (state: RootState) => ({
  history: state.price.history,
})

const mapDispatch = () => ({
  addPrice: AddPrice,
})

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function Component(props: Props) {
  const onSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.addPrice(3, new Date());
  }
  return (
    <form onSubmit={onSubmit}>
      <label>Current Turnip Price</label>
      <input type="number" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default connector(Component);
