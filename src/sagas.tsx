import { put, takeEvery, all } from 'redux-saga/effects'
import { PriceSnapshot } from "./types";
import { AddPrice, ActionType, AddPriceAction, SavePrice } from './redux/actions';
import NoopApi from './PriceApi/noop';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
const priceApi = NoopApi()

export function* saveSnapshot(s: PriceSnapshot) {
  yield delay(1000)
  yield priceApi.add(s).then(_ => console.log("Saved to server"))
  yield put(SavePrice(true, s))
}

export function* watchAddPrice() {
  yield takeEvery(ActionType.ADD_PRICE, function*(action: AddPriceAction) {
    yield saveSnapshot(action.payload)
  })
}

export default function* rootSaga() {
  yield all([
    watchAddPrice(),
  ])
}