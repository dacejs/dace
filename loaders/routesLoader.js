/* eslint global-require: 0, import/no-dynamic-require: 0 */
/**
 * 该文件为 target='web' 提供文件系统操作能力
 * 当  target='web' 时，`require('./routes')` 返回的内容为该 loader 返回的内容
 */
// const { existsSync } = require('fs');
const { resolve } = require('path');
const glob = require('glob');
// const { getOptions } = require('loader-utils');

module.exports = function appLoader() {
  // const options = getOptions(this) || {};
  const cwd = resolve('pages');
  const routes = glob
    .sync('**.js', { cwd })
    .map(item => item.replace('.js', ''))
    .map((name) => {
      const pathWithoutExtension = resolve(cwd, name);
      const endpoint = name === 'home' ? '/' : `/${name}`;
      return (`{
        path: '${endpoint}',
        exact: true,
        component: require('${pathWithoutExtension}')
      }`);
    });

  return `
    export default [
      {
        component: require('./App'),
        routes: [
          ${routes.join(',')}
        ]
      }
    ];
  `;
};
