// Individual exports for testing
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GO_LIST, LOAD_SEARCH } from './constants';
import request from '../../utils/request';
import { loadSearchSuccess } from './actions';
import { SERVER } from '../../utils/universalConst';
import { makeSelectType } from '../../containers/App/selectors';
import { loadList } from '../../containers/ProductListPage/actions';

function* getSearchList({ keyword }) {
  if (!keyword) {
    return yield put(loadSearchSuccess([]));
  }
  const type = yield select(makeSelectType());
  const requestURL = `${SERVER.PT}/products/keyword?q=${keyword}&type=${type}`;
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
    yield put(loadSearchSuccess(searchResult));
  } catch (err) {
    yield put(loadSearchSuccess([]));
  }
}

function* goList({ keyword }) {
  const type = yield select(makeSelectType());
  let url = `/products?type=${type}`;
  if (keyword) url += `&keyword=${keyword}`;
  yield put(push(url));
}

export default function* root() {
  yield takeLatest(LOAD_SEARCH, getSearchList);
  yield takeLatest(GO_LIST, goList);
}
