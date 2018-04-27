/**
 * 七牛图片转尺寸
 * @param imgUrl 原图链接
 * @param width 宽度
 * @param height 高度
 * @returns string 转换后图链接
 */
function parseImgUrl(imgUrl,width,height){
  if(imgUrl.includes('clouddn.com')&&!imgUrl.includes('?imageView')){
    //图片来自七牛且没有被压缩过
    if (width && height) {
      return `${imgUrl}?imageView2/1/w/${parseInt(width)}/h/${parseInt(height)}`;
    } else if (width && !height) {
      return `${imgUrl}?imageView2/2/w/${parseInt(width)}`;
    } else if (!width && height) {
      return `${imgUrl}?imageView2/2/h/${parseInt(height)}`;
    } else {
      return `${imgUrl}?`;
    }
  }
  return imgUrl;
}
export default parseImgUrl;
