// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_SEARCH } from './constants';
import request from '../../utils/request';
import { searchLoaded, searchLoadingError } from './actions';
import { SERVER } from '../../utils/universalConst';

function* getSearchList(action) {
  if (!action.keyword) {
    return yield put(searchLoaded([]));
  }
  const requestURL = `${SERVER.PT}/products/keyword?q=${action.keyword}&type=1`;
  try {
    const result = yield call(request, requestURL);
    const keyword = action.keyword.toUpperCase();
    let searchResult = [];
    if (result) {
      searchResult = (result).map((item) => {
        if (item.no.toUpperCase().includes(keyword)) {
          return item.no;
        }
        return item.series;
      });
    }
    searchResult = Array.from(new Set(searchResult));
    yield put(searchLoaded(searchResult));
  } catch (err) {
    yield put(searchLoadingError(err.toString()));
  }
}

export default function* root() {
  yield takeLatest(LOAD_SEARCH, getSearchList);
}
