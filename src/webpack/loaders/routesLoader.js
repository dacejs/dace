/* eslint global-require: 0, import/no-dynamic-require: 0 */
/**
 * 该文件为 target='web' 提供文件系统操作能力
 * 当  target='web' 时，`require('./routes')` 返回的内容为该 loader 返回的内容
 */
// const { existsSync } = require('fs');
const { resolve } = require('path');
const glob = require('glob');
const paths = require('../config/paths');
// const { getOptions } = require('loader-utils');

module.exports = function routesLoader() {
  function getEndpointFromPath(pagePath) {
    let endpoint = `/${pagePath}`;
    while (endpoint.endsWith('/index')) {
      endpoint = endpoint.replace('/index', '');
    }
    return endpoint || '/';
  }

  // const options = getOptions(this) || {};
  const pageDir = paths.appPages;
  const pageExtension = '.jsx';
  const routes = glob
    .sync(`**/*${pageExtension}`, { cwd: pageDir })
    .map(item => item.replace(pageExtension, ''))
    .map((name) => {
      const endpoint = getEndpointFromPath(name);
      const pathWithoutExtension = resolve(pageDir, name);
      // const endpoint = name === 'home' ? '/' : `/${name}`;
      return (`{
        path: '${endpoint}',
        exact: true,
        component: require('${pathWithoutExtension}')
      }`);
    });

  // 在 routes 最后添加 404 找不到网页的路由
  routes.push(`{
    component: require('./components/NotFound')
  }`);

  return `

    export default [
      {
        component: require('./components/App'),
        routes: [
          ${routes.join(',')}
        ]
      }
    ];
  `;
};
