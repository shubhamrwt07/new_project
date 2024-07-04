// saga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { PRODUCT_LOADING, PRODUCT_SUCCESS, PRODUCT_ERROR } from './constaint';
import { PRODUCT_URL } from '../../helper/api/apiEndPoint'; // Ensure this path is correct

export const productApi = async () => {
  const response = await axios.get(PRODUCT_URL);
  return response.data.response;
};

function* fetchProducts() {
  try {
    const data = yield call(productApi);
    yield put({ type: PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: PRODUCT_ERROR, payload: { error: error.message } });
  }
}

function* productSaga() {
  yield takeLatest(PRODUCT_LOADING, fetchProducts);
}

export default productSaga;
