const { existsSync } = require('fs');
const { resolve } = require('path');
const { isFunction } = require('util');
const requireDefault = require('./requireDefault');

/**
 * 获取 webpack 配置文件
 *
 * @param {string} filename webpack 配置文件地址
 * @return {object} 配置信息
 */
module.exports = (filename) => {
  const baseFile = resolve(__dirname, '../webpack', filename);
  const baseConfig = requireDefault(baseFile);
  let customFile = resolve('src/webpack', filename);
  if (!customFile.endsWith('.js')) {
    customFile = `${customFile}.js`;
  }
  let customConfig;
  if (existsSync(customFile)) {
    customConfig = requireDefault(customFile);
    if (isFunction(customConfig)) {
      customConfig = customConfig(baseConfig);
    }
    return customConfig;
  }

  return baseConfig;
};
