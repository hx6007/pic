// Individual exports for testing
import { takeLatest } from 'redux-saga/effects';
import { loadPack, loadUploadToken } from '../App/saga';
import { LOAD_PACK, LOAD_UPLOAD_TOKEN } from '../App/constants';

export default function* defaultSaga() {
  yield takeLatest(LOAD_PACK, loadPack);
  yield takeLatest(LOAD_UPLOAD_TOKEN, loadUploadToken);
}
