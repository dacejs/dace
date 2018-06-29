/**
 * 判断 store 数据是否已经加载的通用方法
 * @param {object|array} 需要校验的数据
 * @return {boolean}
 */

export default (data) => {
  if (Array.isArray(data)) {
    return data.length;
  }
  if (typeof data === 'object') {
    return Object.keys(data).length;
  }
  return false;
};
