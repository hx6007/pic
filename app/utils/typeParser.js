/**
 * 根据类型获取名称
 * @param type
 * @returns {string}
 */
export function getTypeName(type) {
  switch (parseInt(type)) {
    case 1:
      return "产品";
    case 2:
      return "实景图";
    case 3:
      return "效果图";
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return '店面';
    case 9:
    case 10:
      return '整屋空间';
    default :
      return '店面'
  }
}
