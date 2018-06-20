const { delimiter } = require('path');

// 支持 NODE_PATH 环境变量
const nodePathList = (process.env.NODE_PATH || '').split(delimiter).filter(p => !!p);

module.exports = {
  output: {
    publicPath: '/'
  },
  resolve: {
    modules: [
      'node_modules',
      ...nodePathList // 支持 NODE_PATH 环境变量
    ]
  }
};
