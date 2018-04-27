import { takeLatest, call, put, select } from 'redux-saga/effects';
import { message } from 'antd';
import { DEL_PACK, LOAD_PACKS, UPDATE_KEYWORD, UPDATE_PAGE_NO } from './constants';
import { delPackError, packsLoaded, packsLoadingError } from './actions';
import request from '../../utils/request';
import { SERVER } from '../../utils/universalConst';
import Parser from '../../utils/urlParamParser';
import { makeSelectLocation } from '../App/selectors';
import makeSelectPackListPage from './selectors';
import { updateRouter } from '../App/saga';

/**
 * 加载包列表
 */
function* getPacks() {
  const [packListPage, location] = yield [select(makeSelectPackListPage()), select(makeSelectLocation())];
  const { pageSize } = packListPage;
  const urlParam = new Parser(location.search);
  const keyword = urlParam.get('keyword');
  const type = urlParam.get('type');
  const page = urlParam.get('page') || 1;
  const skip = (page - 1) * pageSize;
  const urlSearch = new Parser();
  urlSearch.set('skip', skip);
  urlSearch.set('limit', pageSize);
  if (type) urlSearch.set('type', type);
  if (keyword) urlSearch.set('keyword', keyword);
  const requestURL = `${SERVER.PT}/packs?${urlSearch.toString()}`;
  try {
    const result = yield call(request, requestURL);
    yield put(packsLoaded(result.packs, result.count));
  } catch (err) {
    yield put(packsLoadingError(err.toString()));
  }
}

/**
 * 删除包
 * @param packId
 */
function* removePacks({ packId }) {
  const requestURL = `${SERVER.PT}/packs/${packId}`;
  try {
    yield call(request, requestURL, { method: 'DELETE' });// 成功向下执行 失败抛出异常
    message.success('删除成功');
    yield getPacks();// 获取包列表
  } catch (err) {
    message.success('删除失败');
    yield put(delPackError(err.toString()));
  }
}

function* updateKeyword({ keyword }) {
  yield updateRouter({ key: 'keyword', value: keyword });
}

function* updatePage({ page }) {
  yield updateRouter({ key: 'page', value: page });
}


// Individual exports for testing
export default function* root() {
  yield takeLatest(LOAD_PACKS, getPacks);
  yield takeLatest(DEL_PACK, removePacks);
  yield takeLatest(UPDATE_KEYWORD, updateKeyword);
  yield takeLatest(UPDATE_PAGE_NO, updatePage);
}
