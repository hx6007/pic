// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from '../../utils/request';
import { listSuccess, listLoadingError } from './actions';
import {
  LOADING_PRODUCTLIST,
} from './constants';
import { SERVER } from '../../utils/universalConst';

function* getList({id}) {
  const requestURL = `${SERVER.PT}/tags/${id}`;
  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, requestURL);
    yield put(listSuccess(result.packs, result.count, result.name));
  } catch (err) {
    yield put(listLoadingError(err.toString()));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOADING_PRODUCTLIST, getList);
}
