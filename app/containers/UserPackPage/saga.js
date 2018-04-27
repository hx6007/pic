import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_PACKS } from '../PackListPage/constants';
import { SERVER } from '../../utils/universalConst';
import request from '../../utils/request';
import { packsLoaded, packsLoadingError } from '../PackListPage/actions';

/**
 * 加载包列表
 */
function* getPacks() {
  const requestURL = `${SERVER.PT}/packs?uid=40716`;
  try {
    const result = yield call(request, requestURL);
    yield put(packsLoaded(result.packs, result.count));
  } catch (err) {
    yield put(packsLoadingError(err.toString()));
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_PACKS, getPacks);
}
