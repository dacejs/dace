/**
 * dace.config.js 未使用 babel 编译
 * 保险起见，请使用 es5 语法书写
 */

module.exports = {
  modify(config, { target }) {
    const appConfig = config;

    if (target === 'web') {
      appConfig.output.filename = 'static/js/bundle.js';
    }

    return appConfig;
  }
};
