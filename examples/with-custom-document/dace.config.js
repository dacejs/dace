const path = require('path');

module.exports = {
  modify(config) {
    const appConfig = config;

    appConfig.resolve.alias = {
      ...appConfig.resolve.alias,
      '../../dist/core/document.js': path.resolve(__dirname, 'src/document.js')
    };
    return appConfig;
  }
};
