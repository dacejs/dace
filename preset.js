/* eslint-disable */
module.exports = {
  presets: [
    require('babel-preset-env'),
    require('babel-preset-react')
  ],
  plugins: [
    require('babel-plugin-transform-decorators-legacy'),
    require('babel-plugin-add-module-exports'),
    require('babel-plugin-transform-class-properties'),
    require('babel-plugin-syntax-object-rest-spread'),
    require('babel-plugin-transform-runtime')
  ]
};
