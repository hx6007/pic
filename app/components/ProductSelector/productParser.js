
/**
 * 转换资源中心产品列表
 * @param products
 * @returns {*}
 */
export function parseRcProducts(products) {
  return products.map((item) => ({
    id: item.sku_id, // id
    sku_id: item.sku_id, // sku_id
    level: item.cv6, // 产品等级
    no: item.matcode || '', // 产品编号
    series: item.matname || '', // 系列
    brand: item.material || '', // 品牌
    spec: item.special || '', // 规格
    image: item.codemap || '', // 图片
    category: -1, // 分类ID 新接口没有分类ID
    categoryName: `${item.matgroup1}/${item.matgroup2}/${item.matgroup3}/${item.matgroup4}`, // 分类名
  }));
}

/**
 * 转换图库包列表为产品列表
 * @param packs
 * @returns {*}
 */
export function parsePacks(packs) {
  return packs.map((item) => {
    const product = item.products[0];
    delete product._id;
    product.id = item._id;
    return product;
  });
}

/**
 * 转换组件产品变化回调时的产品列表
 * @param products
 * @returns {*}
 */
export function parseExporProducts(products) {
  return products.map((item) => ({
    id: item.id, // id
    image: item.image, // 图片
    no: item.no, // 产品编号
    series: item.series, // 系列
    brand: item.brand, // 品牌
    spec: item.spec, // 规格
  }));
}
