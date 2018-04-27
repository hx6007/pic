/**
 * 应用请求封装
 */
import { getUrl } from './serverUrl';
import request, { get, post, put, del } from './request';
import { SERVER } from './universalConst';
const headers = { 'Content-Type': 'application/json' };
/**
 * 前台登录
 * @param username  用户名，
 * @param password  用户密码
 * @returns {Object}
 */
export const loginReq = (username, password) => {
  const requestURL = getUrl('user_api', `/lola_cms_Interface/user/loginIn.do&userName=${username}&password=${password}&site_login=51etk`);
  return request(requestURL);
};

/**
 * 密码加密
 * @param psw  用户密码，
 * @returns {Object}
 */

export const pswReq = (psw) => {
  const requestURL = getUrl('user_api', `/lola_cms_Interface/user/saveSecrect.do?password=${psw}`);
  return request(requestURL);
};
/**
 * 用户退出接口
 *  @param ticket  用户辨识，
 * @returns {Object}
 */

export function logout(ticket) {
  const url = getUrl('user_api', '/lola_cms_Interface/user/loginOut.do');
  const headers = { 'Content-Type': 'application/json', ticket };
  return request(url, { headers });
}

/**
 * 获取用户信息接口
 *  @param userid 用户，
 * @returns {Object}
 */

export function getUserInfo(userid, ticket) {
  const url = getUrl('user_api', `/lola_cms_Interface/user/findByUserid.do?userid=${userid}`);
  const headers = { 'Content-Type': 'application/json', ticket };
  return request(url, { headers });
}

/**
 * 请求标签列表
 * pageSize 为0时获得全部标签
 */
export function getTagList(pageSize = 20, pageNo = 1, keyword) {
  const skip = (pageNo - 1) * pageSize;
  const keywordString = keyword ? `&keyword=${keyword}` : '';
  return request(`${SERVER.PT}/tags?limit=${pageSize}&skip=${skip}${keywordString}`);
}

/**
 * 请求标签总数
 */
export function getTagsCount(keyword) {
  const keywordString = keyword ? `?keyword=${keyword}` : '';
  return request(`${SERVER.PT}/tags/count${keywordString}`);
}

/**
 * 请求标签单条数据
 * @param {string} id
 */
export function getTagDetail(id) {
  return request(`${SERVER.PT}/tags/${id}`);
}

export function deleteTag(id) {
  return request(`${SERVER.PT}/tags/${id}`, { method: 'DELETE' });
}

/**
 * 新增
 * @param name
 * @param describe
 * @param packIds
 * @returns {Object}
 */
export function addTag({ name, describe, packIds }) {
  const data = {
    name,
    describe,
    packIds,
  };
  return request(`${SERVER.PT}/tags`, { method: 'POST', body: JSON.stringify(data), headers });
}

export function updateTag({ id, name, describe, packIds }) {
  const data = {
    name,
    describe,
    packIds,
  };
  return request(`${SERVER.PT}/tags/${id}`, { method: 'PUT', body: JSON.stringify(data), headers });
}


/**
 * 获取包列表
 * @param type
 * @param status
 * @param limit
 * @param skip
 * @param {string} keyword
 */
export function getPackList({ type = 1, status = 2, limit = 20, skip = 0, keyword }) {
  let url = `${SERVER.PT}/packs?type=${type}&status=${status}&limit=${limit}&skip=${skip}`;
  if (keyword) url += `&keyword=${keyword}`;
  return request(url);
}

/**
 * 获取包详情
 * @param id
 * @returns {*}
 */
export const getPack = (id) => get(`${SERVER.PT}/packs/${id}`);

/**
 * 保存包详情
 * */
export const savePack = ({ id, type, products, images, cover, spaces, styles, sites, note, designer, department, shop, brand, address, area, decorateDate, status }) => {
  const url = `${SERVER.PT}/packs/${id}`;
  const data = {
    type,
    images,
    cover: cover || [],
    spaces: spaces || [],
    styles: styles || [],
    sites: sites || [],
    note: note || [],
    products: products || [],
    designer,
    department,
    shop,
    brand,
    location: {
      detail: address,
    },
    area,
    decorateDate,
    status,
  };
  return put(url, data);
};

/**
 * 删除包详情
 * */
export const deletePack = (id) => del(`${SERVER.PT}/packs/${id}`);

/**
 * 不通过时保存包部分详情
 * */
export const saveCheckMessage = ({ id, checkMessage }) => {
  const url = `${SERVER.PT}/packs/${id}`;
  const data = {
    checkMessage,
    status: 5,
  };
  return put(url, data);
};

/**
 * 获取上传凭证
 * @returns {*}
 */
export const getToken = () => get(`${SERVER.PT}/upload`);

/**
 * 获取产品编号搜索结果
 */
export const getSearchResult = (keyword) => {
  const url = `${SERVER.RC}/java-getway/apigateway/api.do?api_path=/lola_cms_Interface/rc_manage/selectByMatcode.do&flagForAddress=rc_cms`;
  const data = {
    matcode: keyword,
    doctype: 'getall',
    page_size: '8',
    page: '1',
    isLogin: '0',
  };
  return post(url, data);
};

/*
 * 获取前台用户的效果图列表
 */
export function getEffectDiagramList({ userid, limit, skip, status }) {
  const params = {
    limit: limit || 20,
    skip: skip || 0,
    uid: userid,
    status: status || "",
  };
  return request(`${SERVER.PT}/packs?uid=${params.uid}&limit=${params.limit}&skip=${params.skip}${params.status === null ? null : `${params.status ? '&status='+params.status : ''}`}`);
}

/**
 * 获取前台效果图详情
 */
export function getEffectDiagram({ id }) {
  return request(`${SERVER.PT}/packs/${id}`);
}

/**
 * 删除前台效果图
 */
export function removeEffectDiagram({ id }) {
  return request(`${SERVER.PT}/packs/${id}`, { method: 'DELETE' });
}

/**
 * 上传效果图
 */
export const uploadEffectDiagram = (data) => post(`${SERVER.PT}/packs`, data);

/**
 * 修改效果图
 * @param {string} id
 * @param {Object} data
 */
export const editEffectDiagram = ({ id, data }) => put(`${SERVER.PT}/packs/${id}`, data);

/**
 * 用户图片管理列表
 * @param {string} uid
 * @param {number} skip
 * @param {number} limit
 * @param {number} status
 */
export const getPackCheckList = ({ uid, skip, limit = 20, status = 3 }) => get(`${SERVER.PT}/packs?uid=${uid}&limit=${limit}&skip=${skip}&status=${status}`);
