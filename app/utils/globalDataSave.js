// 解密
function decryption(obj) {
  try {
    const string = obj.split('').reverse().join('');
    return JSON.parse(string);
  } catch (e) {}
}
// 加密
function encryption(obj) {
  return JSON.stringify(obj).split('').reverse().join('');
}

/**
 * 保存globalData数据
 * @param globalData
 */
export const saveGlobal = (globalData) => {
  const appParse = encryption(globalData);
  window.localStorage.setItem('PT_APP', appParse);
};
/**
 * 读取globalData数据
 * @returns {*}
 */
export const getGlobal = () => {
  const PT_APP = window.localStorage.getItem('PT_APP');
  return decryption(PT_APP);// 还原APP数据
};
