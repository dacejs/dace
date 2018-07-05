// 导入 es6 模块

module.exports = (file) => {
  const module = require(file); // eslint-disable-line
  if (module.default) {
    return module.default;
  }
  return module;
};
