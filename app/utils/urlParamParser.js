import 'url-search-params-polyfill';

/**
 * 封装的URL参数解析器 URLSearchParams
 */
export const Parser=(search)=>{
  return new URLSearchParams(search)
};

export default Parser;
