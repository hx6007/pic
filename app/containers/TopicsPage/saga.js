// import { take, call, put, select } from 'redux-saga/effects';

import { takeLatest } from 'redux-saga/effects';
import { loadUploadToken } from '../App/saga';
import { LOAD_UPLOAD_TOKEN } from '../App/constants';
// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_UPLOAD_TOKEN, loadUploadToken);
}
