import { all } from 'redux-saga/effects';
import watchAuthSaga from './redux/Login/saga';
import productAuthSaga from './redux/Product/saga';

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),
    productAuthSaga(),
  ]);
}
