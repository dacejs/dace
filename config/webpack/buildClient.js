const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const merge = require('webpack-merge');
const buildBase = require('./buildBase');
const { dist } = require('../unjs');

module.exports = merge(buildBase, {
  entry: [resolve(__dirname, '../../src/client.js')],
  output: {
    chunkFilename: 'js/[name].[chunkhash:8].js',
    filename: 'js/[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: ['node_modules'],
        use: [
          {
            loader: 'babel-loader',
            options: {
              forceEnv: 'client'
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              useEslintrc: resolve(__dirname, '../../.stylelintrc.js'),
              ignorePath: resolve(__dirname, '../../.eslintignore')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(dist, { root: process.cwd() }),
    // 编译过程出错信息不会提示，直接报出非零状态码退出
    new StylelintWebpackPlugin({
      context: resolve('src'),
      files: ['**/*.css', '**/*.less', '**/*.s?(a|c)ss']
    })
  ]
});
