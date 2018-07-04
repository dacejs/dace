/**
 * 该文件为 target='web' 提供文件系统操作能力
 * 当  target='web' 时，`require('./routes')` 返回的内容为该 loader 返回的内容
 */

const { resolve } = require('path');

module.exports = (self = {}) => {
  const { rootContext = process.cwd() } = self;
  // console.log('--rootContext: ', rootContext);
  const a = require(resolve(rootContext, 'src/config/unjs.js')); // eslint-disable-line
  // console.log('--a:', a);
  return a;
};
