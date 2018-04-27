import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from '../../utils/request';
import { listSuccess, listLoadingError } from './actions';
import {
  CHANGE_PAGE, CHANGE_URL_PARAM,
  LOADING_PRODUCTLIST,
} from './constants';
import { SERVER } from '../../utils/universalConst';
import { makeSelectLocation, makeSelectPage } from '../App/selectors';
import makeSelectProductListPage from './selectors';

function* getList() {
  const { search } = yield select(makeSelectLocation());
  const { pageSize } = yield select(makeSelectProductListPage());
  const page = yield select(makeSelectPage());
  const skip = (page - 1) * pageSize;
  const pageParams = new URLSearchParams(search);// 当前页面地址参数
  const reqParams = new URLSearchParams();// 请求接口的地址参数
  reqParams.set('status', 2);
  reqParams.set('type', pageParams.get('type') || 1);
  reqParams.set('limit', pageSize);
  reqParams.set('skip', skip);
  if (pageParams.has('space'))reqParams.set('spaces', pageParams.get('space'));
  if (pageParams.has('style'))reqParams.set('styles', pageParams.get('style'));
  if (pageParams.has('site'))reqParams.set('sites', pageParams.get('site'));
  if (pageParams.has('keyword'))reqParams.set('keyword', pageParams.get('keyword'));

  const requestURL = `${SERVER.PT}/packs?tag=1&${reqParams.toString()}`;
  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, requestURL);
    yield put(listSuccess(result.packs, result.count));
  } catch (err) {
    yield put(listLoadingError(err.toString()));
  }
}

function* changePage({ page }) {
  const { search, pathname } = yield select(makeSelectLocation());
  const params = new URLSearchParams(search);
  params.set('page', page);
  yield put(push(`${pathname}?${params.toString()}`));
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

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOADING_PRODUCTLIST, getList);
  yield takeLatest(CHANGE_PAGE, changePage);
  yield takeLatest(CHANGE_URL_PARAM, changeUrlParam);
}
