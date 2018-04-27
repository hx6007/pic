import axios from 'axios';

/**
 * 发起请求
 * @param method
 * @param url
 * @param data
 * @param headers
 * @returns {Promise<AxiosResponse<any>>}
 */
export function axiosRequest(method, url, data, headers = { 'Content-Type': 'application/json' }) {
  const config = {
    url,
    method,
    headers,
    data,
  };
  return axios.request(config).catch((error) => {
    let myError = null;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      myError = {
        data: error.response.data,
        status: error.response.status,
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      myError = '服务器无响应';
    } else {
      // Something happened in setting up the request that triggered an Error
      myError = error.message;
    }
    throw myError;
  }).then((result) => result.data);
}

/**
 * 发起get请求
 */
export const get = (url) => axiosRequest('get', url);

/**
 * 发起post请求
 */
export const post = (url, data, header) => axiosRequest('post', url, data, header);
/**
 * 发起put请求
 */
export const put = (url, data, header) => axiosRequest('put', url, data, header);
/**
 * 发起delete请求
 */
export const del = (url) => axiosRequest('delete', url);

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options = {}) {
  const { method = 'GET', body, headers } = options;
  const myMethod = method.toLowerCase();
  const myBody = body && JSON.parse(body);
  return axiosRequest(myMethod, url, myBody, headers);
}
