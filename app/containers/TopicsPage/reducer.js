/*
 *
 * TopicsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';
import {
  LOAD_UPLOAD_TOKEN_SUCCESS, LOAD_UPLOAD_TOKEN_ERROR,
} from '../App/constants';

const initialState = fromJS({
  token: '',
});

function topicsPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_UPLOAD_TOKEN_SUCCESS:
      return state.set('token', action.token);
    case LOAD_UPLOAD_TOKEN_ERROR:
      return state.set('err', action.err);
    default:
      return state;
  }
}

export default topicsPageReducer;
