/**
 * 导入 es6 模块
 * @param {string} file 要导入的文件路径
 * @return {object} 导入的模块
 */
module.exports = (file) => {
  const module = require(file); // eslint-disable-line
  if (module.default) {
    return module.default;
  }
  return module;
};
