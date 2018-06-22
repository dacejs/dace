const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const buildBase = require('./buildBase');

module.exports = merge(buildBase, {
  entry: [resolve(__dirname, '../../src/server.js')],
  output: {
    filename: 'server.js'
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
