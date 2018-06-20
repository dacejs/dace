const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
  // mode: 'production'
  entry: ['./src/server.js'],
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
  node: {
    __filename: true,
    __dirname: true
  },
  performance: { hints: false }
});
