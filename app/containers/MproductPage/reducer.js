/*
 *
 * MproductPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, LOAD_PACK_INFO, LOAD_PACK_INFO_SUCCESS, LOAD_PACK_INFO_ERROR,
  LOAD_SERIES_INFO, LOAD_SERIES_INFO_SUCCESS, LOAD_SERIES_INFO_ERROR,
  LOAD_RELATION_INFO, LOAD_RELATION_INFO_SUCCESS, LOAD_RELATION_INFO_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  packInfo: false,
  seriesInfo: false,
  relationInfo: false,
});

function mproductPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_PACK_INFO:
      return state
        .set('loading', true)
        .set('error', false)
        .set('packInfo', false);
    case LOAD_PACK_INFO_SUCCESS:
      return state
        .set('loading', false)
        .set('packInfo', action.packInfo);
    case LOAD_SERIES_INFO:
      return state
        .set('loading', true)
        .set('error', false)
        .set('seriesInfo', false);
    case LOAD_SERIES_INFO_SUCCESS:
      return state
        .set('loading', false)
        .set('seriesInfo', action.seriesInfo);
    case LOAD_RELATION_INFO:
      return state
        .set('loading', true)
        .set('error', false)
        .set('relationInfo', false);
    case LOAD_RELATION_INFO_SUCCESS:
      return state
        .set('loading', false)
        .set('relationInfo', action.relationInfo);
    case LOAD_PACK_INFO_ERROR:
    case LOAD_SERIES_INFO_ERROR:
    case LOAD_RELATION_INFO_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default mproductPageReducer;
