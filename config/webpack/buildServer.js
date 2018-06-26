const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const buildBase = require('./buildBase');
const { dist } = require('../unjs');

const bundlerName = 'server.js';

module.exports = merge(buildBase, {
  entry: [resolve(__dirname, '../../src/server.js')],
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
              forceEnv: 'server'
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
              forceEnv: 'server'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(resolve(dist, bundlerName), { root: process.cwd() })
  ],
  resolve: {
    alias: {
      'webpack-stats.json': `${process.cwd()}/${dist}/webpack-stats.json`
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
