/**
 * dace.config.js 未使用 babel 编译
 * 保险起见，请使用 es5 语法书写
 */
const path = require('path');

module.exports = {
  modify(config) {
    const appConfig = config;

    appConfig.resolve.alias['./components/NotFound'] = path.resolve(__dirname, 'src/components/NotFound.js');

    return appConfig;
  }
};
