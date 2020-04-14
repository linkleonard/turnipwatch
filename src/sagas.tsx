import { put, takeEvery, all } from 'redux-saga/effects'
import { LoadWeeklyPrices, WeeklyActionType, SaveWeeklyPrices } from 'redux/actions';
import LocalStorageWeeklyPrices from './PriceStore/localstorage';

const priceStore = LocalStorageWeeklyPrices()

export function* loadWeeklyPrices() {
  const items = yield priceStore.list()
  yield put(LoadWeeklyPrices(items))
}

export function* watchSaveWeeklyPrices() {
  yield takeEvery(WeeklyActionType.SAVE_WEEKLY_PRICES, function*(action: SaveWeeklyPrices) {
    yield priceStore.save(action.payload)
  })
}

export default function* rootSaga() {
  yield all([
    loadWeeklyPrices(),
    watchSaveWeeklyPrices(),
  ])
}
