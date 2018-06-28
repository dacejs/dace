const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const buildBase = require('./buildBase');
const setBabelOptions = require('../../utils/setBabelOptions');
const { outputPath } = require('../unjs');

const bundlerName = 'server.js';

/**
 * @module config/buildServer webpack 配置
 * @param {object} options
 * @param {boolean} options.verbose 输出日志
 * @return {function}
 */
module.exports = ({ verbose }) => merge(buildBase, {
  entry: [resolve(__dirname, '../../server.js')],
  output: {
    filename: bundlerName
  },
  module: {
    rules: [
      {
        test: /\/routes\.js$/,
        use: [
          {
            loader: resolve(__dirname, 'loaders/routesLoader.js'),
            options: {
              target: 'node'
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
              target: 'node'
            })
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(resolve(outputPath, bundlerName), {
      root: process.cwd(),
      verbose
    })
  ],
  resolve: {
    alias: {
      'webpack-stats.json': `${process.cwd()}/${outputPath}/webpack-stats.json`
    }
  },
  target: 'node',
  externals: [nodeExternals()],
  // node: {
  //   __filename: true,
  //   __dirname: true,
  //   fs: 'empty',
  //   child_process: 'empty',
  //   net: 'empty'
  // },
  performance: { hints: false }
});
