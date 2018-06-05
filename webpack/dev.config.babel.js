import { delimiter } from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MoveWebpackPlugin from 'move-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// 支持 NODE_PATH 环境变量
const nodePathList = (process.env.NODE_PATH || '').split(delimiter).filter(p => !!p);

export default {
  mode: 'development',
  entry: ['./src/client.js'],
  output: {
    chunkFilename: 'js/[name].[chunkhash:8].js',
    filename: 'js/[name].[hash:8].js',
    publicPath: '/'
    // path: 'dist' // default: 'dist'
  },
  resolve: {
    modules: [
      'node_modules',
      ...nodePathList // 支持 NODE_PATH 环境变量
    ]
  },
  // performance: { hints: false },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: ['node_modules'],
        use: {
          loader: 'babel-loader'
        }
      },
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
    new CleanWebpackPlugin('dist', { root: process.cwd() }),
    new MoveWebpackPlugin({
      src: 'webpack-stats.json',
      dest: 'dist'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css'
    })
  ]
};
