/*
 *
 * Mmymsg reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, GET_DATA, GET_DATA_ERROR, GET_DATA_SUCCESS
} from './constants';

const initialState = fromJS({});

function mmymsgReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_DATA:
      return state
        .set('loading', true)
        .set('error', false);
    case GET_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('userData', action.userdata);
    case GET_DATA_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default mmymsgReducer;
