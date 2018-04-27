/*
 *
 * PackListPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEL_PACK_ERROR,
  LOAD_PACKS, LOAD_PACKS_ERROR, LOAD_PACKS_SUCCESS
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  packs: false,
  pageSize:20,//分页大小
  totalCount: 0,//总数量
});

function packListPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PACKS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('packs', false)
        .set('totalCount', 0);
    case LOAD_PACKS_SUCCESS:
      return state
        .set('packs', action.packs)
        .set('totalCount', action.totalCount)
        .set('loading', false);
    case LOAD_PACKS_ERROR:
    case DEL_PACK_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default packListPageReducer;
