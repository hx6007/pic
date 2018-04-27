/**
 * 服务器根域名
 * @type {string}
 * site_code => 用户中心（java）：user_api;
 */
import {SERVER} from "./universalConst";

export function getUrl(site_code='', url='') {
  const ori_url = `${SERVER.RC}/java-getway/apigateway/api.do?`;
  const query = '&api_path=';
  return ori_url + site_code + query + url + '&flagForAddress=etm_api';
}
