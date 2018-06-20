const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MoveWebpackPlugin = require('move-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
  entry: ['./src/client.js'],
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
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', { root: process.cwd() }),
    new MoveWebpackPlugin({
      src: 'webpack-stats.json',
      dest: 'dist'
    }),
    // 编译过程出错信息不会提示，直接报出非零状态码退出
    new StylelintWebpackPlugin({
      context: resolve('src'),
      files: ['**/*.css', '**/*.less', '**/*.s?(a|c)ss']
    })
  ]
});
