/**
 * 设置 `process.env` 环境变量
 * 尤其特殊处理了 `NODE_PATH`
 * @param {object} pairs 需要设置的键值对
 */
module.exports = (pairs) => {
  Object.keys(pairs).forEach((key) => {
    process.env[key] = pairs[key];
    if (key === 'NODE_PATH') {
      // https://www.cnblogs.com/accordion/p/6074350.html
      module.constructor._initPaths(); // eslint-disable-line
    }
  });
};
