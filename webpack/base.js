import { delimiter, resolve } from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MoveWebpackPlugin from 'move-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';

// 支持 NODE_PATH 环境变量
const nodePathList = (process.env.NODE_PATH || '').split(delimiter).filter(p => !!p);

export default {
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
  // target: 'node',
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
    new CleanWebpackPlugin('dist', { root: process.cwd() }),
    new MoveWebpackPlugin({
      src: 'webpack-stats.json',
      dest: 'dist'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css'
    }),
    // 编译过程出错信息不会提示，直接报出非零状态码退出
    new StylelintWebpackPlugin({
      context: resolve('src'),
      files: ['**/*.css', '**/*.less', '**/*.s?(a|c)ss']
    })
  ]
};
