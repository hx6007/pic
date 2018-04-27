// import { take, call, put, select } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SERVER } from '../../utils/universalConst';
import request from '../../utils/request';
import { listLoadingError, listSuccess, getList } from './actions';
import { LOADING, SEARCH, CHANGE_URL_PARAM } from './constants';
import { makeSelectLocation } from '../App/selectors';

function* getListt({ id }) {
  const requestURL = `${SERVER.PT}/tags/${id}`;
  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, requestURL);
    yield put(listSuccess(result.packs, result.count, result.name));
  } catch (err) {
    yield put(listLoadingError(err.toString()));
  }
}

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
function* changeUrlParam({ key, value }) {
  const { search } = yield select(makeSelectLocation());
  const params = new URLSearchParams(search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  params.set('page', 1);
  params.delete('id');
  yield put(replace(`/mobile/pageList?type=1&${params.toString()}`));
}
// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOADING, getListt);
  yield takeLatest(SEARCH, getSearchList);
  yield takeLatest(CHANGE_URL_PARAM, changeUrlParam);
}
