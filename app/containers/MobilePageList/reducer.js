/*
 *
 * MobilePageList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, LOADING, LOADING_SUCCESS, LOADING_ERROR, SEARCH_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  packs: false,
  error: false,
  list: false,
  count: 0, // 总数量
  pagesize: 30,
});

function mobilePageListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOADING:
      return state
        .set('loading', true)
        .set('packs', false)
        .set('error', false);
    case LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('packs', action.packs)
        .set('count', action.count)
        .set('error', false);
    case LOADING_ERROR:
      return state
        .set('loading', false)
        .set('packs', false)
        .set('error', action.err);
    case SEARCH_SUCCESS:
      return state
        .set('list', action.list);
    default:
      return state;
  }
}

export default mobilePageListReducer;
