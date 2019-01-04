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
