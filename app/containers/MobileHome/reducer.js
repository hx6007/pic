/*
 *
 * MobileHome reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, LOADING, LOADING_SUCCESS, LOADING_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  list: false,
  error: false,
});

function mobileHomeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOADING:
      return state
        .set('loading', true)
        .set('error', false);
    case LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('list', action.list);
    case LOADING_ERROR:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}

export default mobileHomeReducer;
