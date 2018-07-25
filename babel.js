/* eslint-disable */
module.exports = {
  presets: [
    [require.resolve('babel-preset-env'), { modules: false }],
    require.resolve('babel-preset-react')
  ],
  plugins: [
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-class-properties'),
    require.resolve('babel-plugin-syntax-object-rest-spread'),
    require.resolve('babel-plugin-transform-runtime')
  ]
};
