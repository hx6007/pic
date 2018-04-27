/*
 *
 * Mlabellist reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,LOADING,LOADING_SUCCESS,LOADING_ERROR, SEARCH_SUCCESS
} from './constants';

const initialState = fromJS({
  tags: [],
  loading: false,
  error: false,
  name: false,
  list: false,
});

function mlabellistReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return state
        .set('loading', true)
        .set('error', false)
        .set('count', 0);
    case LOADING_SUCCESS:
      return state
        .set('tags', action.packs)
        .set('name', action.name)
        .set('loading', false);
    case LOADING_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case SEARCH_SUCCESS:
      return state
        .set('list', action.list);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default mlabellistReducer;
