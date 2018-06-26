const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const base = require('./base');
const { assetExtensions, localIdentName } = require('../unjs');

module.exports = merge(base, {
  mode: 'development',
  entry: [resolve(__dirname, '../../src/client.js')],
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
              forceEnv: 'client'
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
          { loader: 'postcss-loader' }
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
