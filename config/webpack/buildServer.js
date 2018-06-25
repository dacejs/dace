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
