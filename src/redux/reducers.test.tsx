import { priceReducer } from './reducers'
import { ActionType, AddPrice } from './actions'
test('add price adds to history store', () => {
  const state = {
    history: [],
  }
  const snapshot = {
    price: 10,
    timestamp: new Date("2020-01-01T00:00:00Z"),
  }
  const action = AddPrice(snapshot.price, snapshot.timestamp)
  const result = priceReducer(state, action)
  
  expect(result.history).toContainEqual(snapshot);
});
