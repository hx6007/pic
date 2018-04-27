/* eslint-disable no-alert,no-console */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectTToken } from '../App/selectors';
import { tlogoutSuccess } from '../App/actions';
import { TLOGOUT } from '../App/constants';
import { logout } from '../../utils/service';


export function* loginOut() {
  const ticket = yield select(makeSelectTToken());
  try {
// eslint-disable-next-line no-unused-vars
    const result = yield call(logout, ticket);
    yield put(tlogoutSuccess());
    alert('退出成功！');
  } catch (err) {
    console.log('err', err);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(TLOGOUT, loginOut);
}
