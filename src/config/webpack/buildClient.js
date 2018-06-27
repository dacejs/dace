const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const merge = require('webpack-merge');
const buildBase = require('./buildBase');
const WrireStatsFilePlugin = require('./plugins/writeStatsFilePlugin');
const setBabelOptions = require('../../utils/setBabelOptions');
const { outputPath } = require('../unjs');

module.exports = merge(buildBase, {
  entry: [resolve(__dirname, '../../client.js')],
  output: {
    chunkFilename: 'js/[name].[chunkhash:8].js',
    filename: 'js/[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\/routes\.js$/,
        use: [
          {
            loader: resolve(__dirname, 'loaders/routesLoader.js'),
            options: {
              target: 'web'
            }
          }
        ]
      },
      {
        test: /\.js$/i,
        exclude: ['node_modules'],
        use: [
          {
            loader: 'babel-loader',
            options: setBabelOptions({
              target: 'web'
            })
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: resolve(__dirname, '../../../.eslintrc.js'),
              ignorePath: resolve(__dirname, '../../../.eslintignore')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(outputPath, { root: process.cwd() }),
    // 编译过程出错信息不会提示，直接报出非零状态码退出
    new StylelintWebpackPlugin({
      context: resolve('src'),
      configFile: resolve(__dirname, '../../../stylelint.config.js'),
      files: ['**/*.css', '**/*.less', '**/*.s?(a|c)ss']
    }),
    new WrireStatsFilePlugin()
  ]
});
