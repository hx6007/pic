/* eslint-disable consistent-return */
// import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { message } from 'antd';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TLOGIN } from '../App/constants';
import {hideLoginForm, tloginFailed, tloginSuccess} from '../App/actions';
import { loginReq, pswReq } from '../../utils/service';

function* fromLogin({ username, password }) {
  try {
    const passwordResult = yield call(pswReq, password);
    const pasw = passwordResult.data.password;
    const result = yield call(loginReq, username, pasw);
    if (result.code === 1) {
      message.success('登录成功！');
      yield put(hideLoginForm());
      yield put(tloginSuccess(result.data.token, username, result.data.userid));
      return false;
    }
    message.warning(result.message);
    yield put(tloginFailed());
  } catch (err) {
    message.error('服务器出错，请稍后重试！');
    yield put(tloginFailed());
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(TLOGIN, fromLogin);
}

