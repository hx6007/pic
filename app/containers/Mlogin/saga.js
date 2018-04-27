// import { take, call, put, select } from 'redux-saga/effects';

import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';
import { TLOGIN_SUCCESS } from '../App/constants';
import { tloginFailed } from '../App/actions';

function* touser() {
  yield put(tloginFailed());
  yield put(push('/mobile/user'));
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(TLOGIN_SUCCESS, touser);
}
