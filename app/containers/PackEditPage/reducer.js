/*
 *
 * PackEditPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_SEARCH, LOAD_SEARCH_SUCCESS, LOAD_SEARCH_ERROR, SAVE_PACK,
  SAVE_PACK_SUCCESS, SAVE_PACK_ERROR,
  LOAD_UPLOAD_TOKEN, LOAD_UPLOAD_TOKEN_SUCCESS, LOAD_UPLOAD_TOKEN_ERROR,
  LOAD_PACK, LOAD_PACK_ERROR, LOAD_PACK_SUCCESS, UPDATE_PRODUCTS,
  DELETE_PRODUCT, UPDATE_COVER, UPDATE_DESIGNER, UPDATE_DEPARTMENT, UPDATE_SHOP,
  UPDATE_BRAND, UPDATE_ADDRESS, UPDATE_AREA, UPDATE_DECORATE_DATE,
  UPDATE_STATUS, UPDATE_TYPE, RESET_PACK, UPDATE_SPACES, UPDATE_STYLES,
  UPDATE_SITES, UPDATE_IMAGES, UPDATE_TAGS,
} from './constants';
import {
  LOAD_TAGS, LOAD_TAGS_ERROR,
  LOAD_TAGS_SUCCESS,
} from '../TagListPage/constants';

const initialState = fromJS({
  packId: false, // 包ID
  searchList: false, // 搜索结果
  products: false, // 已选列表
  cover: '', // 封面
  designer: '', // 设计师
  department: '', // 所属单位
  shop: '', // 店面名称
  brand: '', // 品牌
  address: '', // 实景地址
  area: '', // 面积
  decorateDate: 0, // 装修日期
  status: 2, // 发布状态: 1 待发布 2 已发布
  type: 0, // 1 产品 2 实景图 3 效果图 4 样板间 5 直板图 6 地面图 7 装修效果图 8 平面布局图 9 整屋空间效果图 10 整屋空间实景图
  spaces: false, // 空间属性列表
  styles: false, // 风格属性列表
  sites: false, // 场所属性列表
  tags: false, // 所属标签 [{id,name},...]

  uploadToken: false, // 上传凭证
  loading: false,
  error: false,
  // 搜索产品状态
  searchLoading: false,
  searchError: false,
  // 标签加载
  tagLoading: false,
  tagError: false,
  serverTags: false, // 服务器所有标签

});

function packEditPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TAGS:
      return state
      .set('tagLoading', true)
      .set('tagError', false)
      .set('serverTags', false);
    case LOAD_TAGS_SUCCESS:
      return state
      .set('tagLoading', false)
      .set('serverTags', action.tags);
    case LOAD_TAGS_ERROR:
      return state
      .set('tagLoading', false)
      .set('tagError', action.error);
    case DELETE_PRODUCT: {
      const products = state.get('products').concat();
      products.splice(action.index, 1);
      return state
      .set('products', products);
    }
    case UPDATE_PRODUCTS:
      return state.set('products', action.products);
    case UPDATE_COVER:
      return state.set('cover', action.cover);
    case UPDATE_IMAGES:
      return state.set('images', action.images);
    case UPDATE_DESIGNER:
      return state.set('designer', action.designer);
    case UPDATE_DEPARTMENT:
      return state.set('department', action.department);
    case UPDATE_SHOP:
      return state.set('shop', action.shop);
    case UPDATE_BRAND:
      return state.set('brand', action.brand);
    case UPDATE_ADDRESS:
      return state.set('address', action.address);
    case UPDATE_AREA:
      return state.set('area', action.area);
    case UPDATE_DECORATE_DATE:
      return state.set('decorateDate', action.decorateDate);
    case UPDATE_STATUS:
      return state.set('status', action.status);
    case UPDATE_TYPE:
      return state.set('type', action.packType);
    case UPDATE_SPACES:
      return state.set('spaces', action.spaces);
    case UPDATE_STYLES:
      return state.set('styles', action.styles);
    case UPDATE_SITES:
      return state.set('sites', action.sites);
    case UPDATE_TAGS:
      return state.set('tags', action.tags);
    case LOAD_UPLOAD_TOKEN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('uploadToken', false);
    case LOAD_UPLOAD_TOKEN_SUCCESS:
      return state
        .set('uploadToken', action.token)
        .set('loading', false);
    case LOAD_PACK:
      return state
        .set('packId', action.id)
        .set('loading', true)
        .set('error', false);
    case SAVE_PACK:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_PACK_SUCCESS:
    case SAVE_PACK_SUCCESS:
      return state
        .set('loading', false);
    case LOAD_SEARCH:
      return state
        .set('searchLoading', true)
        .set('searchError', false)
        .set('searchList', []);
    case LOAD_SEARCH_SUCCESS:
      return state
        .set('searchList', action.searchList)
        .set('searchLoading', false);
    case LOAD_SEARCH_ERROR:
      return state
      .set('searchError', action.error)
      .set('searchLoading', false);
    case LOAD_UPLOAD_TOKEN_ERROR:
    case LOAD_PACK_ERROR:
    case SAVE_PACK_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case RESET_PACK:
      return initialState.set('uploadToken', state.get('uploadToken'));
    default:
      return state;
  }
}

export default packEditPageReducer;
