module.exports = {
  modify(config, { target }) {
    const appConfig = config;

    if (target === 'web') {
      appConfig.output.filename = 'static/js/bundle.js';
    }

    return appConfig;
  }
};
