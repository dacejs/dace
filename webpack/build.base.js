const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
  output: {
    publicPath: '/'
  },
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
              localIdentName: '[local]_[hash:base64:2]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.png$/i,
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
