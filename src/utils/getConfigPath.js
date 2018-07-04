const { existsSync } = require('fs');
const { resolve } = require('path');

/**
 * @param {array} filenames 需要查找的配置文件名称列表
 * @return {string} 配置文件地址
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
