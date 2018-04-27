import { call, put, select, takeLatest } from 'redux-saga/effects';
// import {} from "redux-saga";
import { GET_DATA } from './constants';
import { makeSelectTToken, makeSelectUserid } from '../App/selectors';
import { loadingDataError, loadingDatasuccess } from './actions';
import { getUserInfo } from '../../utils/service';


export function* getData() {
  const userid = yield select(makeSelectUserid());
  const ticket = yield select(makeSelectTToken());
  try {
    const data = yield call(getUserInfo, userid, ticket);
    if (data.code === 1) {
      yield put(loadingDatasuccess(data.data));
    }
  } catch (err) {
    yield put(loadingDataError(err.toString()));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_DATA, getData);
}
