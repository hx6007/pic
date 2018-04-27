import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_PACK, LOAD_PACK_ERROR, LOAD_UPLOAD_TOKEN, LOAD_UPLOAD_TOKEN_ERROR } from '../../containers/App/constants';
import { loadPack, loadUploadToken } from '../../containers/App/saga';

function* err(error) {
  console.log('error', error);
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_PACK, loadPack);
  yield takeLatest(LOAD_PACK_ERROR, err);

  // 上传凭证
  yield takeLatest(LOAD_UPLOAD_TOKEN, loadUploadToken);
  yield takeLatest(LOAD_UPLOAD_TOKEN_ERROR, err);
}
