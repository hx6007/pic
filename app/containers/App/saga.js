import { push } from 'react-router-redux';
import { put, select, call } from 'redux-saga/effects';
import { makeSelectLocation } from './selectors';
import { getPack, getToken } from '../../utils/service';
import {
  loadPackError, loadPackSuccess, loadUploadTokenError,
  loadUploadTokenSuccess,
} from './actions';


/**
 * 更新地址
 * @param key
 * @param value 值为undefine时删除参数
 */
export function* updateRouter({ key, value }) {
  const { search, pathname } = yield select(makeSelectLocation());
  const urlParser = new URLSearchParams(search);
  if (value === undefined) {
    urlParser.delete(key);
  } else {
    urlParser.set(key, value);
  }
  const url = `${pathname}?${urlParser.toString()}`;
  yield put(push(url));
}

/**
 * 加载包详情
 * @param id
 */
export function* loadPack({ id }) {
  try {
    const result = yield call(getPack, id);
    const pack = result;
    pack.address = result.location && result.location.detail;
    pack.products = result.products.map((item) => ({ ...item, id: item._id }));
    pack.area = parseInt(result.area, 10);
    pack.decorateDate = (new Date(pack.decorateDate)).getTime();
    yield put(loadPackSuccess(pack));
  } catch (error) {
    yield put(loadPackError(error));
  }
}
/**
 * 加载上传凭证
 */
export function* loadUploadToken() {
  try {
    const { token } = yield call(getToken);
    yield put(loadUploadTokenSuccess(token));
  } catch (error) {
    yield put(loadUploadTokenError(error));
  }
}

