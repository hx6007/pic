/*
 *
 * SeriesEditPage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOAD_TAG_SUCCESS } from './constants';

const initialState = fromJS({
  serverTag: null, // 服务器请求数据
});

function seriesEditPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TAG_SUCCESS:
      return state.set('serverTag', action.tag);
    default:
      return state;
  }
}

export default seriesEditPageReducer;
