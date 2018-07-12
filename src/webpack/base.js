const { delimiter, resolve } = require('path');
const { publicPath, outputPath } = require('../config/dace');

// 支持 NODE_PATH 环境变量
const nodePathList = (process.env.NODE_PATH || '').split(delimiter).filter(p => !!p);

module.exports = {
  output: {
    publicPath,
    path: resolve(outputPath)
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
        test: /\/nodeAddons\//,
        use: [
          {
            loader: resolve(__dirname, 'loaders/nodeLoader.js')
          }
        ]
      }
    ]
  }
};
