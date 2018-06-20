const { delimiter } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 支持 NODE_PATH 环境变量
const nodePathList = (process.env.NODE_PATH || '').split(delimiter).filter(p => !!p);

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  resolve: {
    modules: [
      'node_modules',
      ...nodePathList // 支持 NODE_PATH 环境变量
    ]
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
};
