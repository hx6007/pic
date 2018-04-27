import { takeLatest, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { message } from 'antd';
import { LOAD_TAGS, DEL_TAG } from './constants';
import { deleteTag, getTagList, getTagsCount } from '../../utils/service';
import { loadTagsFailed, loadTagsSuccess } from './actions';
import { makeSelectTags } from './selectors';
import { UPDATE_URL_PARAM } from '../App/constants';
import { updateRouter } from '../App/saga';

export function* loadTags({ pageSize, pageNo, keyword }) {
  try {
    const response = yield call(getTagList, pageSize, pageNo, keyword);
    const { count } = yield call(getTagsCount, keyword);
    yield put(loadTagsSuccess(response, count));
  } catch (e) {
    yield put(loadTagsFailed(e.toString()));
    message.error('加载出错');
  }
}

function* delTags({ tagId }) {
  try {
    yield call(deleteTag, tagId);
    const tags = yield select(makeSelectTags());
    const index = tags.findIndex((item) => item.id === tagId);
    if (index >= 0) {
      const tagsCopy = tags.concat();
      tagsCopy.splice(index, 1);
      yield put(loadTagsSuccess(tagsCopy));
    }
  } catch (e) {
    message.error('删除失败');
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_TAGS, loadTags);
  yield takeLatest(DEL_TAG, delTags);
  yield takeLatest(UPDATE_URL_PARAM, updateRouter);
}
