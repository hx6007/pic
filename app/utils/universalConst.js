
export const SPACES = ['客厅', '餐厅', '卧室', '书房', '厨房', '卫生间', '阳台', '过道', '玄关', '杂物房', '背景墙'];

export const STYLES = ['现代简约', '新中式', '简欧', '田园', '美式', '北欧', '时尚混搭'];

export const SITES = ['小户型', '中户型', '大户型', '复式', '别墅', '酒店', '商场', '娱乐场所', '办公室场所', '户外广场'];

// 服务器配置
let server = {};
switch (process.env.TARGET) {
  case 'prod':// 生产环境
    server = {
      // RC: '//rc.lolatc.com',
      RC: 'https://java-getway.51etm.com',
      PT: '//api.51etuku.com',
      QND: '//ovn6s20wq.bkt.clouddn.com/', // 七牛下载
      QNU: '//up-z2.qiniu.com/', // 七牛上传
    };
    break;
  default:// 默认测试环境
  case 'test':// 测试环境
    server = {
      // RC: '//staging.lolatc.com:8010', // 资源中心
      RC: 'https://java-getway-stg.51etm.com', // 资源中心
      PT: '//122.112.215.179:4040', // 图库
      QND: '//p2p2fydni.bkt.clouddn.com/', // 七牛下载
      QNU: '//up-z0.qiniu.com/', // 七牛上传
    };
    break;
  case 'dev':// 开发环境
    server = {
      RC: '//java-getway-stg.51etm.com', // 资源中心
      // RC: 'https://api-stg.lolatc.com', // 资源中心
      PT: '//192.168.6.97:4040',
      QND: '//p2p2fydni.bkt.clouddn.com/', // 七牛下载
      QNU: '//up-z0.qiniu.com/', // 七牛上传
    };
    break;
}

/**
 * 导出服务器配置
 * @type {{}}
 */
export const SERVER = server;
