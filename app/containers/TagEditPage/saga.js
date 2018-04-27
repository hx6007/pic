import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { message } from 'antd';

// Individual exports for testing
import { LOAD_TAG, SAVE_TAG, LOAD_SEARCH } from './constants';
import {
  addTag, getPackList, getTagDetail,
  updateTag,
} from '../../utils/service';
import { loadSearchError, loadSearchSuccess, loadTagSuccess } from './actions';

function* loadSearch({ keyword }) {
  if (!keyword) return yield put(loadSearchSuccess([]));
  try {
    const { packs } = yield call(getPackList, keyword);
    yield put(loadSearchSuccess(packs));
  } catch (e) {
    yield put(loadSearchError(e.toString()));
  }
}
function* saveTag({ id, name, describe, packIds }) {
  if (!name) {
    message.error('请填写标签名称！');
    return null;
  }
  try {
    if (id) {
      yield call(updateTag, { id, name, describe, packIds });
    } else {
      yield call(addTag, { name, describe, packIds });
    }
    message.success('保存成功！');
    yield put(push('/admin/tags'));
  } catch (e) {
    message.error('保存失败,请检查标签名是否重复');
  }
}
function* loadTag({ id }) {
  if (id === 'new') return null;
  try {
    const result = yield call(getTagDetail, id);
    yield put(loadTagSuccess(result));
  } catch (e) {
    message.error('加载出错，请重试');
  }
}


export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_SEARCH, loadSearch);
  yield takeLatest(LOAD_TAG, loadTag);
  yield takeLatest(SAVE_TAG, saveTag);
}
