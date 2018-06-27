const { delimiter, resolve } = require('path');
const { publicPath, outputPath } = require('../unjs');

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
  }
};
