// @preval

/**
 * 获取工程目录下的页面信息
 */

const { resolve } = require('path');
const glob = require('glob');

const cwd = resolve('src/pages');
const pages = glob
  .sync('**/index.js', { cwd })
  .map(item => item.replace('/index.js', ''));

module.exports = { cwd, pages };
