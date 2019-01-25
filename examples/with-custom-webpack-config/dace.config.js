/**
 * dace.config.js 未使用 babel 编译
 * 保险起见，请使用 es5 语法书写
 */

module.exports = {
  modify(config, { target, isDev }) {
    const appConfig = config;

    // 修改开发环境下webpack的模式
    if (target === 'web' && isDev) {
      appConfig.mode = 'production';
    }

    return appConfig;
  }
};
