/*
 *
 * AdminLoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {LOGIN, LOGIN_FAILED,LOGIN_SUCCESS} from "../App/constants";

const initialState = fromJS({
  error:'',
  loading:false
});

function adminLoginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state
        .set('loading',false);
    case LOGIN_FAILED:
      return state
        .set('loading',false)
        .set('error', action.error);
    case LOGIN:
      return state
        .set('loading',true)
        .set('error','');
    default:
      return state;
  }
}



export default adminLoginPageReducer;
