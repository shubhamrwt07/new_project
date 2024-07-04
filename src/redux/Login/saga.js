// authSaga.js
import { put, takeLatest, call } from 'redux-saga/effects';
import { loginApi } from './api'; // Implement loginApi for fetching data
import { loginFailure, loginSuccess } from './action';

function* login(action) {
  try {
    const { email, password } = action.payload;
    const result = yield call(loginApi, email, password);
    yield put(loginSuccess(result.authToken)); // Dispatch loginSuccess action
  } catch (error) {
    yield put(loginFailure(error.message)); // Dispatch loginFailure action
  }
}

function* authSaga() {
  yield takeLatest('LOGIN_REQUEST', login);
}

export default authSaga;
