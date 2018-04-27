/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const UPDATE_GLOBAL = 'app/App/UPDATE_GLOBAL';
export const SHOW_LOGIN_FORM = 'app/App/SHOW_LOGIN_FORM';
export const HIDE_LOGIN_FORM = 'app/App/HIDE_LOGIN_FORM';
export const LOGIN = 'app/App/LOGIN';
export const LOGIN_SUCCESS = 'app/App/LOGIN_SUCCESS';
export const LOGIN_FAILED = 'app/App/LOGIN_FAILED';
export const LOGOUT = 'app/App/LOGOUT';
export const TLOGIN = 'app/App/TLOGIN';
export const TLOGIN_SUCCESS = 'app/App/TLOGIN_SUCCESS';
export const TLOGIN_FAILED = 'app/App/TLOGIN_FAILED';
export const TLOGOUT = 'app/App/TLOGOUT';
export const TLOGOUT_SUCCESS = 'app/App/TLOGOUT_SUCCESS';
export const TLOGOUT_FAILED = 'app/App/TLOGOUT_FAILED';
export const LOGOUT_SUCCESS = 'app/App/LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'app/App/LOGOUT_FAILED';
export const LOAD_USERINFO = 'app/App/LOAD_USERINFO';
export const LOAD_USERINFO_SUCCESS = 'app/App/LOAD_USERINFO_SUCCESS';
export const LOAD_USERINFO_FAILED = 'app/App/LOAD_USERINFO_FAILED';

export const UPDATE_URL_PARAM = 'app/App/UPDATE_URL_PARAM';

export const LOAD_UPLOAD_TOKEN = 'app/App/LOAD_UPLOAD_TOKEN';
export const LOAD_UPLOAD_TOKEN_SUCCESS = 'app/App/LOAD_UPLOAD_TOKEN_SUCCESS';
export const LOAD_UPLOAD_TOKEN_ERROR = 'app/App/LOAD_UPLOAD_TOKEN_ERROR';

export const LOAD_PACK = 'app/App/LOAD_PACK';
export const LOAD_PACK_SUCCESS = 'app/App/LOAD_PACK_SUCCESS';
export const LOAD_PACK_ERROR = 'app/App/LOAD_PACK_ERROR';
