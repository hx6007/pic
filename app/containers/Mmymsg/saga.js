// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import {call, put, select, takeLatest} from "redux-saga/effects";
import {GET_DATA} from "./constants";
import {getUserInfo} from "../../utils/service";
import {loadingDataError, loadingDatasuccess} from "./actions";
import {makeSelectTToken, makeSelectUserid} from "../App/selectors";

function* getData() {
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

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_DATA, getData);
}
