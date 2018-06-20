const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
  mode: 'development',
  entry: ['./src/client.js'],
  output: {
    chunkFilename: 'js/[name].js',
    filename: 'js/[name].js'
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
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:2]'
            }
          },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.png$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          }
        }
      }
    ]
  }
});
