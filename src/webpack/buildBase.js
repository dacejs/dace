const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const base = require('./base');
const getConfigPath = require('../utils/getConfigPath');
const { assetExtensions, localIdentName } = require('../config/unjs');

module.exports = merge(base, {
  mode: 'production',
  module: {
    rules: [
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
                path: getConfigPath('postcss.config.js', '.postcss.js', '.postcssrc')
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
            name: 'assets/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css'
    })
  ]
});
