/* eslint-disable consistent-return */
// Individual exports for testing
import { push } from 'react-router-redux';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOADING, SEARCH, CHANGE_URL_PARAM, CHANGE_PAGE } from './constants';
import request from '../../utils/request';
import { SERVER } from '../../utils/universalConst';
import { getList, listLoadingError, listSuccess } from './actions';
import { makeSelectLocation, makeSelectPage } from '../App/selectors';
import makeSelectMobilePageList from './selectors';


function* getPask() {
  const { search } = yield select(makeSelectLocation());
  const { pagesize } = yield select(makeSelectMobilePageList());
  const page = yield select(makeSelectPage());
  const skip = (page - 1) * pagesize;
  const pageParams = new URLSearchParams(search);// 当前页面地址参数
  const reqParams = new URLSearchParams();// 请求接口的地址参数
  reqParams.set('status', 2);
  reqParams.set('tag', 1);
  reqParams.set('type', pageParams.get('type') || 1);
  reqParams.set('limit', pagesize);
  reqParams.set('skip', skip);
  if (pageParams.has('space'))reqParams.set('spaces', pageParams.get('space'));
  if (pageParams.has('style'))reqParams.set('styles', pageParams.get('style'));
  if (pageParams.has('site'))reqParams.set('sites', pageParams.get('site'));
  if (pageParams.has('keyword'))reqParams.set('keyword', pageParams.get('keyword'));
  const requestURL = `${SERVER.PT}/packs?${reqParams.toString()}`;
  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, requestURL);
    yield put(listSuccess(result.packs, result.count));
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
  const { search, pathname } = yield select(makeSelectLocation());
  const params = new URLSearchParams(search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  params.set('page', 1);
  yield put(push(`${pathname}?${params.toString()}`));
}
function* changePage({ page }) {
  const { search, pathname } = yield select(makeSelectLocation());
  const params = new URLSearchParams(search);
  params.set('page', page);
  yield put(push(`${pathname}?${params.toString()}`));
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOADING, getPask);
  yield takeLatest(CHANGE_URL_PARAM, changeUrlParam);
  yield takeLatest(SEARCH, getSearchList);
  yield takeLatest(CHANGE_PAGE, changePage);
}
