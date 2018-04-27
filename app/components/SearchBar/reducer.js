/*
 *
 * PackEditPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_SEARCH, LOAD_SEARCH_SUCCESS,
} from './constants';

const initialState = fromJS({
  searchList: false,
});

function searchBarReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SEARCH:
      return state
        .set('searchList', false);
    case LOAD_SEARCH_SUCCESS:
      return state
        .set('searchList', action.searchList);
    default:
      return state;
  }
}

export default searchBarReducer;
