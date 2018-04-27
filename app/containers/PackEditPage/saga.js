// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { message } from 'antd';
import {
  SAVE_PACK, LOAD_SEARCH, LOAD_UPLOAD_TOKEN, LOAD_PACK,
  ADD_PRODUCT,
} from './constants';
import request from '../../utils/request';
import {
  savePackError, searchLoaded, searchLoadingError,
  loadUploadTokenSuccess, loadUploadTokenError,
  loadPackSuccess, loadPackError, updateProducts, resetPack, updateCover,
  updateDesigner, updateDepartment, updateShop, updateBrand, updateAddress,
  updateArea, updateDecorateDate, updateStatus, updateType, updateSpaces,
  updateStyles, updateSites, updateImages, updateTags,
} from './actions';
import { SERVER } from '../../utils/universalConst';
import { makeSelectUsername } from '../App/selectors';
import makeSelectPackEditPage, { makeSelectType } from './selectors';
import { LOAD_TAGS } from '../TagListPage/constants';
import { loadTags } from '../TagListPage/saga';

function* loadPack(action) {
  const requestURL = `${SERVER.PT}/packs/${action.id}`;
  try {
    const result = yield call(request, requestURL);
    const { products, cover, images, designer, department, shop, brand, location, area, decorateDate, status, type, spaces, styles, sites, tags } = result;
    yield put(loadPackSuccess());
    yield put(updateProducts(products));
    const defaultCover = cover || (images && images[0]);
    yield put(updateCover(defaultCover));
    yield put(updateImages(images));
    yield put(updateDesigner(designer));
    yield put(updateDepartment(department));
    yield put(updateShop(shop));
    yield put(updateBrand(brand));
    if (location) {
      yield put(updateAddress(location.detail));
    }
    yield put(updateArea(area));
    yield put(updateDecorateDate(decorateDate));
    yield put(updateStatus(status));
    yield put(updateType(type));
    yield put(updateSpaces(spaces));
    yield put(updateStyles(styles));
    yield put(updateSites(sites));
    if (type === 1) {
      yield put(updateTags(tags));
    }
  } catch (err) {
    yield put(loadPackError(err.toString()));
  }
}
/**
 * 检查表单 确认无误返回true
 */
function checkError({ type, products, images, spaces, styles, sites }) {
  if (!images || images.length <= 0) {
    return '请上传图片';
  } else if ([1, 4, 5, 6].includes(type) && (!products || products.length <= 0)) {
    return '请添加产品';
  } else if (type === 1 && products.length > 1) {
    return '产品管理只允许添加一个产品';
  } else if ([2, 3, 4, 7, 8].includes(type) && (!spaces || spaces.length <= 0)) {
    return '请选择空间属性';
  } else if ([2, 3, 4, 7, 8, 9, 10].includes(type) && (!styles || styles.length <= 0)) {
    return '请选择风格属性';
  } else if ([2, 3, 4, 7, 8, 9, 10].includes(type) && (!sites || sites.length <= 0)) {
    return '请选择场所属性';
  } else if (spaces.length > 1) {
    return '空间属性填写有误';
  } else if (styles.length > 3) {
    return '风格属性填写有误';
  } else if (sites.length > 2) {
    return '择场所属性填写有误';
  }
  return false;
}
function* savePack({ images }) {
  const { packId: _id, products, cover, designer, department, shop, brand, address, area, decorateDate, status, spaces, styles, sites, tags: rawTag } = yield select(makeSelectPackEditPage());
  const tags = rawTag || [];
  const type = yield select(makeSelectType());
  const recorder = yield select(makeSelectUsername());
  const notEmptyCover = cover || (images && images[0]);
  const error = checkError({ type, products, images, spaces, styles, sites });
  if (error) {
    message.error(error);
    return yield put(savePackError(error));
  }
  const data = {
    products: products || [],
    images,
    type,
    spaces: spaces || [],
    styles: styles || [],
    sites: sites || [],
    designer,
    department,
    shop,
    area,
    status,
    brand,
    cover: notEmptyCover,
    recorder,
    location: {
      detail: address,
    },
  };
  if (decorateDate) data.decorateDate = decorateDate;
  if (type === 1) {
    if (tags.length > 20) {
      message.error('标签数不能多于20个！');
      return yield put(savePackError('标签数不能多于20个！'));
    }
    data.tagIds = tags.map((item) => item.id);
  }
  const headers = { 'Content-Type': 'application/json' };
  try {
    let requestURL = `${SERVER.PT}/packs`;
    if (_id) {
      requestURL = `${requestURL}/${_id}`;
      yield call(request, requestURL, { method: 'PUT', body: JSON.stringify(data), headers });
    } else {
      yield call(request, requestURL, { method: 'POST', body: JSON.stringify(data), headers });
    }
    message.success('保存成功');
    yield put(resetPack());
    yield put(push(getBackUrl(type)));
  } catch (err) {
    message.error(err.toString());
  }
}
function getBackUrl(type) {
  switch (type) {
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return '/admin/pack?type=4,5,6,7,8';
    case 9:
    case 10:
      return '/admin/pack?type=9,10';
    default:
      return `/admin/pack?type=${type}`;
  }
}
function* getSearchList({ keyword }) {
  if (!keyword) {
    return yield put(searchLoaded([]));
  }
  const requestURL = `${SERVER.RC}/java-getway/apigateway/api.do?api_path=/lola_cms_Interface/rc_manage/selectByMatcode.do&flagForAddress=rc_cms`;
  const headers = { 'Content-Type': 'application/json' };
  const data = {
    matcode: keyword,
    doctype: 'getall',
    page_size: '8',
    page: '1',
    isLogin: '0',
  };
  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, requestURL, { method: 'POST', body: JSON.stringify(data), headers });
    if (result.code === 1) {
      const products = parseProducts(result.data.result);
      yield put(searchLoaded(products));
    } else {
      yield put(searchLoadingError(result.msg));
    }
  } catch (err) {
    yield put(searchLoadingError(err.toString()));
  }
}

function* getRubySearchList({ keyword }) {
  if (!keyword) {
    return yield put(searchLoaded([]));
  }
  const requestURL = `${SERVER.RC}/api/v1/products?site_code=lola_gallery&search=${keyword}`;
  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, requestURL);
    if (result.code === 0) {
      const products = parseRubyProducts(result.data.products);
      yield put(searchLoaded(products));
    } else {
      yield put(searchLoadingError(result.msg));
    }
  } catch (err) {
    yield put(searchLoadingError(err.toString()));
  }
}
function parseRubyProducts(products) {
  return products.map((item) => ({
    key: item.sku_id, // key
    sku_id: item.sku_id, // sku_id
    level: item.level, // 产品等级
    no: item.product_no || '', // 产品编号
    series: item.name || '', // 系列
    brand: item.brand || '', // 品牌
    spec: item.spec || '', // 规格
    image: item.picture || '', // 图片
    category: item.product_category_id, // 分类ID 新接口没有分类ID
    categoryName: item.product_category_name, // 分类名
  }));
}
function parseProducts(products) {
  return products.map((item) => ({
    key: item.sku_id, // sku_id
    sku_id: item.sku_id, // sku_id
    level: item.cv6, // 产品等级
    no: item.matcode || '', // 产品编号
    series: item.matname || '', // 系列
    brand: item.material || '', // 品牌
    spec: item.special || '', // 规格
    image: item.codemap || '', // 图片
    category: -1, // 分类ID 新接口没有分类ID
    categoryName: `${item.matgroup1}/${item.matgroup2}/${item.matgroup3}/${item.matgroup4}`, // 分类名
  }));
}

function* loadToken() {
  const requestURL = `${SERVER.PT}/upload`;
  try {
    const result = yield call(request, requestURL);
    yield put(loadUploadTokenSuccess(result.token));
  } catch (err) {
    yield put(loadUploadTokenError(err.toString()));
  }
}

function* addProduct({ index }) {
  const { searchList, products } = yield select(makeSelectPackEditPage());
  const item = searchList[index];
  const list = products || [];
  const elementIndex = list.findIndex((element) => element.sku_id === item.sku_id);
  if (elementIndex >= 0) {
    list.splice(elementIndex, 1);
  }
  list.unshift(item);
  yield put(searchLoaded([]));
  yield put(updateProducts(list));
}

export default function* root() {
  yield takeLatest(LOAD_UPLOAD_TOKEN, loadToken);
  yield takeLatest(LOAD_SEARCH, getSearchList);
  yield takeLatest(SAVE_PACK, savePack);
  yield takeLatest(LOAD_PACK, loadPack);
  yield takeLatest(ADD_PRODUCT, addProduct);
  yield takeLatest(LOAD_TAGS, loadTags);
}
