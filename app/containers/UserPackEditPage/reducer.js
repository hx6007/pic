/*
 *
 * UserPackEditPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';
import {
  LOAD_PACK_ERROR, LOAD_PACK_SUCCESS,
  LOAD_UPLOAD_TOKEN_SUCCESS, LOAD_UPLOAD_TOKEN_ERROR, LOAD_PACK,
} from '../App/constants';

const initialState = fromJS({
  token: '',
  pack: null,
});

function userPackEditPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_UPLOAD_TOKEN_SUCCESS:
      return state.set('token', action.token);
    case LOAD_UPLOAD_TOKEN_ERROR:
      return state.set('err', action.err);
    case LOAD_PACK:
      return state
        .set('pack', null)
        .set('error', false);
    case LOAD_PACK_SUCCESS:
      return state.set('pack', action.pack);
    case LOAD_PACK_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default userPackEditPageReducer;
