/*
 *
 * PackEditPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
  LOAD_SEARCH, LOAD_SEARCH_SUCCESS, LOAD_SEARCH_ERROR,
} from './constants';

const initialState = fromJS({
  searchList: false,
  loading: false,
  error: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SEARCH:
      return state
        .set('loading', true)
        .set('error', false)
        .set('searchList', false);
    case LOAD_SEARCH_SUCCESS:
      return state
        .set('searchList', action.searchList)
        .set('loading', false);
    case LOAD_SEARCH_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default homePageReducer;
