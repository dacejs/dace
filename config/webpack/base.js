const { delimiter, resolve } = require('path');
const { publicPath, dist } = require('../unjs');

// 支持 NODE_PATH 环境变量
const nodePathList = (process.env.NODE_PATH || '').split(delimiter).filter(p => !!p);

module.exports = {
  output: {
    publicPath,
    path: resolve(dist)
  },
  resolve: {
    alias: {
      // 为了在 unjs 里加载实际项目中的文件而添加的 hack
      CWD: `${process.cwd()}/`
    },
    modules: [
      'node_modules',
      ...nodePathList // 支持 NODE_PATH 环境变量
    ]
  }
};
