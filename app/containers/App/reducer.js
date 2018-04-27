/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  SHOW_LOGIN_FORM,
  HIDE_LOGIN_FORM,
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  TLOGIN,
  TLOGIN_SUCCESS,
  TLOGOUT_SUCCESS,
  TLOGIN_FAILED,
  UPDATE_GLOBAL,
} from './constants';
import { saveGlobal } from '../../utils/globalDataSave';

// The initial state of the App
const initialState = fromJS({
  username: false, // 用户名
  token: false, // 登录凭证
  allowType: false, // 后台允许的修改类型
  isShowLoginForm: false, // 前端控制登录框
  tusername: false, // 客户用户名
  ttoken: false, // 客户登录凭证
  userid: false, // 客户id
  terror: false,
});

/**
 * 保存到缓存中
 * @param state
 * @returns {*}
 */
function saveData(state) {
  saveGlobal(state.toJS());
  return state;
}
function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GLOBAL:
      return fromJS(action.global);
    case LOGIN:
      return state
        .set('allowType', false)
        .set('token', false);
    case LOGIN_SUCCESS:
      return saveData(state
        .set('username', action.username)
        .set('token', action.token)
        .set('allowType', action.allowType));
    case LOGOUT:
      return saveData(state
        .set('username', false)
        .set('token', false)
        .set('allowType', false));
    case TLOGIN: // 前端请求登录
      return state
        .set('tusername', false)
        .set('terror', false)
        .set('ttoken', false);
    case TLOGIN_SUCCESS:   // 前端登录成功
      return saveData(state
        .set('tusername', action.username)
        .set('ttoken', action.token)
        .set('userid', action.userid));
    case TLOGIN_FAILED:   // 前端登录失败
      return state
        .set('terror', action.err);
    case TLOGOUT_SUCCESS:  // 前端退出成功
      return saveData(state
        .set('tusername', false)
        .set('ttoken', false)
        .set('userid', false)
        .set('terror', false));
    case SHOW_LOGIN_FORM:
      return state
        .set('isShowLoginForm', true);
    case HIDE_LOGIN_FORM:
      return state
        .set('isShowLoginForm', false);
    default:
      return state;
  }
}

export default appReducer;
