const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const merge = require('webpack-merge');
const buildBase = require('./buildBase');
const WrireStatsFilePlugin = require('./plugins/writeStatsFilePlugin');
const getConfigPath = require('../../utils/getConfigPath');
const setBabelOptions = require('../../utils/setBabelOptions');
const { outputPath } = require('../unjs');

/**
 * @module config/buildClient webpack 配置
 * @param {object} options
 * @param {boolean} options.verbose 输出日志
 * @return {function}
 */
module.exports = ({ verbose }) => merge(buildBase, {
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
              configFile: getConfigPath('.eslintrc.js', '.eslintrc', '.eslint.config.js'),
              ignorePath: getConfigPath('.eslintignore')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(outputPath, {
      root: process.cwd(),
      verbose
    }),
    // 编译过程出错信息不会提示，直接报出非零状态码退出
    new StylelintWebpackPlugin({
      context: resolve('src'),
      configFile: getConfigPath('stylelint.config.js', '.stylelintrc.js', '.stylelintrc'),
      files: ['**/*.css', '**/*.less', '**/*.s?(a|c)ss']
    }),
    new WrireStatsFilePlugin()
  ]
});
