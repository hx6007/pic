import { createSelector } from 'reselect';
import Parser from "../../utils/urlParamParser";

const selectGlobal = (state) => state.get('global');
const selectRoute = (state) => state.get('route');

const makeSelectLoginApp = () => createSelector(
  selectGlobal,
  (state) => state.toJS()
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('token')
);
const makeSelectTToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('ttoken')
);
const makeSelectAllowType = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('allowType')
);
const makeSelectUsername = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('username')
);
const makeSelectUserid = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userid')
);
const makeSelectTUsername = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('tusername')
);
/**
 * 得到路由地址中的key值
 * @param key
 * @returns {*}
 */
const makeSelectUrlParam = (key) => createSelector(
  selectRoute,
  (routeState) => {
    const search = routeState.getIn(['location', 'search']);
    const param = new URLSearchParams(search);
    if (param.has(key)) {
      return param.get(key);
    }
    return null;
  }
);
/**
 * 得到路由地址中的类型
 * @returns 数字数组
 */
const makeSelectType = () => createSelector(
  selectRoute,
  (routeState) => {
    const search = routeState.getIn(['location', 'search']);
    const param = new URLSearchParams(search);
    if (param.has('type')) {
      const typeString = decodeURIComponent(param.get('type'));
      return typeString.split(',').map((item) => parseInt(item, 10));
    }
    return [1];
  }
);
/**
 * 得到路由地址中的当前页码
 * @returns 当前页码 默认1
 */
const makeSelectPage = () => createSelector(
  selectRoute,
  (routeState) => {
    const search = routeState.getIn(['location', 'search']);
    const param = new URLSearchParams(search);
    if (param.has('page')) {
      return parseInt(param.get('page'), 10);
    }
    return 1;
  }
);

export {
  makeSelectLocation,
  makeSelectLoginApp,
  makeSelectToken,
  makeSelectAllowType,
  makeSelectUsername,
  makeSelectUserid,
  makeSelectTToken,
  makeSelectUrlParam,
  makeSelectType,
  makeSelectPage,
  makeSelectTUsername,
};
