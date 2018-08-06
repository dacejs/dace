module.exports = {
  modify(config, { target, dev }) {
    const appConfig = config;

    // 修改开发环境下浏览器端编译输出文件的名称
    if (target === 'web' && dev) {
      appConfig.output.filename = 'client.custom.js';
    }

    return appConfig;
  }
};
