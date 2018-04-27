import { call, put, takeLatest } from 'redux-saga/effects';
import {
  packInfoLoaded, packInfoLoadingError, relationInfoLoaded, relationInfoLoadingError,
  seriesInfoLoadingError, seriesInfoLoaded,
} from './actions';
import request from '../../utils/request';
import { LOAD_PACK_INFO } from './constants';
import { SERVER } from '../../utils/universalConst';

export function* getPackInfo(action) {
  const requestURL = `${SERVER.PT}/packs/${action.packId}`;
  try {
    // Call our request helper (see 'utils/request')
    const packInfo = yield call(request, requestURL);
    // fetch series info
    if (action.isProduct) {
      const seriesName = packInfo.products[0].series;
      const requestSeriesURL = `${SERVER.PT}/products/seriesCount?series=${seriesName}`;
      try {
        // Call our request helper (see 'utils/request')
        const seriesInfo = yield call(request, requestSeriesURL);
        yield put(seriesInfoLoaded(seriesInfo));
      } catch (err) {
        yield put(seriesInfoLoadingError(err.toString()));
      }
    }

    // fetch relation info
    const requestRelationURL = `${SERVER.PT}/products/relative?packId=${action.packId}`;
    try {
      // Call our request helper (see 'utils/request')
      const relationInfo = yield call(request, requestRelationURL);
      yield put(relationInfoLoaded(relationInfo));
    } catch (err) {
      yield put(relationInfoLoadingError(err.toString()));
    }

    yield put(packInfoLoaded(packInfo));
  } catch (err) {
    yield put(packInfoLoadingError(err.toString()));
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_PACK_INFO, getPackInfo);
}
