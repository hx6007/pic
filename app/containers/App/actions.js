/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SHOW_LOGIN_FORM, HIDE_LOGIN_FORM, LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT,
  TLOGIN, TLOGIN_SUCCESS, TLOGIN_FAILED,
  TLOGOUT, TLOGOUT_SUCCESS, UPDATE_URL_PARAM, LOAD_PACK,
  LOAD_PACK_ERROR, LOAD_PACK_SUCCESS,
  LOAD_UPLOAD_TOKEN,
  LOAD_UPLOAD_TOKEN_ERROR, LOAD_UPLOAD_TOKEN_SUCCESS, UPDATE_GLOBAL,
} from './constants';
import { createAction } from '../../utils/actionCreator';

// 更新全局变量
export const updateGlobal = createAction(UPDATE_GLOBAL, 'global');

export const showLoginForm = createAction(SHOW_LOGIN_FORM);
export const hideLoginForm = createAction(HIDE_LOGIN_FORM);
export const login = createAction(LOGIN, 'username', 'password');
export const loginSuccess = createAction(LOGIN_SUCCESS, 'token', 'allowType', 'username');
export const loginFailed = createAction(LOGIN_FAILED, 'error');
export const logout = createAction(LOGOUT);
/**
 * 前台登录退出
 * @type {Function}
 */
export const tlogin = createAction(TLOGIN, 'username', 'password');
export const tloginSuccess = createAction(TLOGIN_SUCCESS, 'token', 'username', 'userid');
export const tloginFailed = createAction(TLOGIN_FAILED, 'err');
export const tlogout = createAction(TLOGOUT);
export const tlogoutSuccess = createAction(TLOGOUT_SUCCESS);

/**
 * 更新地址参数
 * @param {string} key 参数键
 * @param {string} value  参数值
 * @type {Function}
 */
export const updateUrlParam = createAction(UPDATE_URL_PARAM, 'key', 'value');
/**
 * 加载上传凭证Action
 */
export const loadUploadToken = createAction(LOAD_UPLOAD_TOKEN);
export const loadUploadTokenSuccess = createAction(LOAD_UPLOAD_TOKEN_SUCCESS, 'token');
export const loadUploadTokenError = createAction(LOAD_UPLOAD_TOKEN_ERROR, 'error');
/**
 * 加载包详情凭证Action
 */
export const loadPack = createAction(LOAD_PACK, 'id');
export const loadPackSuccess = createAction(LOAD_PACK_SUCCESS, 'pack');
export const loadPackError = createAction(LOAD_PACK_ERROR, 'error');
