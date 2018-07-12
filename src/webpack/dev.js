const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const base = require('./base');
const setBabelOptions = require('../utils/setBabelOptions');
const getConfigPath = require('../utils/getConfigPath');
const { assetExtensions, localIdentName } = require('../config/dace');

module.exports = merge(base, {
  mode: 'development',
  entry: [resolve(__dirname, '../client.js')],
  output: {
    chunkFilename: 'js/[name].js',
    filename: 'js/[name].js'
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
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: getConfigPath('postcss.config.js', '.postcssrc.js', '.postcssrc')
              }
            }
          }
        ]
      },
      {
        test: new RegExp(`.(${assetExtensions.join('|')})$`, 'i'),
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ] // ,
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: new RegExp('(react|Header)'), // /(ccc|sub\/bbb|\.\/d)/,
  //         chunks: 'initial',
  //         name: 'vendor',
  //         // 优先级
  //         priority: 1,
  //         // 忽略命中次数，只要命中且使用过一次就打入 vendor
  //         enforce: true
  //       }
  //     }
  //   }
  // }
});
