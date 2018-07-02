/* eslint-disable */
const { resolve } = require('path');

module.exports = {
  plugins: [
    require('stylelint')({
      configFile: resolve(__dirname, 'stylelint.config.js'),
      ignorePath: resolve(__dirname, '.stylelintignore')
    }),
    require('postcss-cssnext')
  ]
};
