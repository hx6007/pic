/* eslint-disable consistent-return */
// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOADING } from './constants';
import { getList } from './actions';
import { SERVER } from '../../utils/universalConst';
import request from '../../utils/request';


function* getSearchList({ keyword }) {
  if (!keyword) {
    return yield put(getList([]));
  }
  const requestURL = `${SERVER.PT}/products/keyword?q=${keyword}&type=1`;
  try {
    const result = yield call(request, requestURL);
    const keywordUp = keyword.toUpperCase();
    let searchResult = (result || []).map((item) => {
      if (item.no.toUpperCase().includes(keywordUp)) {
        return item.no;
      }
      return item.series;
    });
    searchResult = Array.from(new Set(searchResult));
    yield put(getList(searchResult));
  } catch (err) {
    yield put(getList([]));
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOADING, getSearchList);
}
