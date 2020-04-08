import { put, takeEvery, all } from 'redux-saga/effects'
import { PriceSnapshot } from "models";
import { ActionType, AddPriceAction, SavePrice, LoadPrice } from './redux/actions';
import LocalStorageApi from './PriceApi/localstorage';

const priceApi = LocalStorageApi()

export function* saveSnapshot(s: PriceSnapshot) {
  yield priceApi.add(s)
  yield put(SavePrice(true, s))
}

export function* watchAddPrice() {
  yield takeEvery(ActionType.ADD_PRICE, function*(action: AddPriceAction) {
    yield saveSnapshot(action.payload)
  })
}

export function* loadSnapshots() {
  const items = yield priceApi.list()
  yield put(LoadPrice(items))
}

export default function* rootSaga() {
  yield all([
    watchAddPrice(),
    loadSnapshots(),
  ])
}