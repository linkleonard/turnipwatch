import { put, takeEvery, all } from 'redux-saga/effects'
import { PriceSnapshot } from "models";
import { ActionType, AddPriceAction, SavePrice, LoadPrice, LoadWeeklyPrices } from 'redux/actions';
import LocalStorageApi from './PriceApi/localstorage';
import LocalStorageWeeklyPrices from './PriceStore/localstorage';

const priceApi = LocalStorageApi()
const priceStore = LocalStorageWeeklyPrices()

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

export function* loadWeeklyPrices() {
  const items = yield priceStore.list()
  yield put(LoadWeeklyPrices(items))
}

export default function* rootSaga() {
  yield all([
    watchAddPrice(),
    loadSnapshots(),
    loadWeeklyPrices(),
  ])
}
