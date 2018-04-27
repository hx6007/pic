/*
 *
 * SeriesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, LOAD_TAGS, LOAD_TAGS_SUCCESS, LOAD_TAGS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  tags: false,
  pageSize: 20,
  count: 0,
});

function seriesPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TAGS:
      return state.set('loading', true)
      .set('error', false)
      .set('count', 0)
      .set('tags', false);
    case LOAD_TAGS_SUCCESS:
      return state
      .set('loading', false)
      .set('count', action.count)
      .set('tags', action.tags);
    case LOAD_TAGS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case DEFAULT_ACTION:
    default:
      return state;
  }
}

export default seriesPageReducer;
