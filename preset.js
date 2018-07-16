/* eslint-disable */
module.exports = (context, opts = {}) => ({
  compact: false,
  presets: [
    require('babel-preset-react')
  ],
  plugins: [
    require('babel-plugin-preval'),
    [require('babel-plugin-transform-decorators-legacy')],
    require('babel-plugin-add-module-exports'),
    require('babel-plugin-transform-class-properties'),
    require('babel-plugin-transform-es2015-modules-commonjs'),
    require('babel-plugin-syntax-object-rest-spread')
  ]
});
