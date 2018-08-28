const path = require('path');

module.exports = {
  modify(config) {
    const appConfig = config;

    appConfig.resolve.alias = {
      ...appConfig.resolve.alias,
      './document': path.resolve(__dirname, 'src/document.js')
    };
    return appConfig;
  }
};
