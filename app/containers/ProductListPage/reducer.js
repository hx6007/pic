/*
 *
 * ProductListPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, LOADING_PRODUCTLIST, LOADING_PRODUCTLIST_SUCCESS, LOADING_PRODUCTLIST_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  packs: false,
  count: 0, // 总数量
  pageSize: 30, // 分页大小 (当前页存放于路由地址，使用selector获得)
});

function productListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_PRODUCTLIST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('packs', [])
        .set('count', 0);
    case LOADING_PRODUCTLIST_SUCCESS:
      return state
        .set('packs', action.packs)
        .set('count', action.count)
        .set('loading', false);
    case LOADING_PRODUCTLIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case DEFAULT_ACTION:
    default:
      return state;
  }
}

export default productListPageReducer;
