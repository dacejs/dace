const { existsSync } = require('fs');
const { resolve } = require('path');

/**
 * 查找存在的配置文件，返回第一个存在的配置文件地址
 * 主要用于查找以下配置文件：
 * - postcss
 * - eslint
 * - stylelint
 *
 * @param {...string} filenames 需要查找的配置文件名称列表
 * @return {string} 第一个存在的配置文件地址
 */
module.exports = (...filenames) => {
  const configFile = filenames
    .map(filename => resolve(filename))
    .find(filename => existsSync(filename));

  if (configFile) {
    return configFile;
  }
  return resolve(__dirname, '../..', filenames[0]);
};
