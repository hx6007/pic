/*
 *
 * Mlogin reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';
import { TLOGIN, TLOGIN_FAILED, TLOGIN_SUCCESS } from '../App/constants';

const initialState = fromJS({
  loading: false,
});

function mloginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TLOGIN_SUCCESS:
      return state
        .set('loading', false);
    case TLOGIN_FAILED:
      return state
        .set('loading', false);
    case TLOGIN:
      return state
        .set('loading', true);
    default:
      return state;
  }
}

export default mloginReducer;
