// import { take, call, put, select } from 'redux-saga/effects';

import {call, put, takeLatest} from "redux-saga/effects";
import {LOGIN} from "../App/constants";
import {SERVER} from "../../utils/universalConst";
import request from "../../utils/request";
import {loginSuccess,loginFailed} from "../App/actions";

function* execLogin({username,password}) {
  if(!username){
    yield put(loginFailed('请输入账号'));
  }else if(!password){
    yield put(loginFailed('请输入密码'));
  }else {
    const requestURL = `${SERVER.PT}/auth/login`;
    const headers = {'Content-Type': 'application/json'};
    const data = {username,password};
    try {
      const result = yield call(request, requestURL, {method: 'POST', body: JSON.stringify(data), headers});
      yield put(loginSuccess(result.token,result.allowType,username));
    } catch (err) {
      const errResult = yield err.response&&err.response.json();
      const errorString=errResult&&errResult.message||err.toString();
      yield put(loginFailed(errorString));
    }
  }

}
// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOGIN, execLogin);
  // See example in containers/HomePage/saga.js
}
