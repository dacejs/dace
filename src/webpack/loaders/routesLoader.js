/* eslint global-require: 0, import/no-dynamic-require: 0 */
/**
 * 该文件为 target='web' 提供文件系统操作能力
 * 当  target='web' 时，`require('./routes')` 返回的内容为该 loader 返回的内容
 */
const { existsSync } = require('fs');
const { resolve } = require('path');
const glob = require('glob');
const { getOptions } = require('loader-utils');

module.exports = function routesLoader() {
  const options = getOptions(this) || {};
  const cwd = resolve('src/pages');
  const pages = glob
    .sync('**/index.js', { cwd })
    .map(item => item.replace('/index.js', ''))
    .map((name) => {
      let endpoint;
      let page;

      const routerFile = resolve(cwd, `${name}/router.js`);

      if (existsSync(routerFile)) {
        const { path, component } = require(routerFile);
        endpoint = path;
        page = component;
      }

      if (!endpoint) {
        endpoint = name === 'home' ? '/' : `/${name}`;
      }
      if (!page) {
        page = options.target === 'web' ?
          `asyncComponent(() => import(/* webpackChunkName: "${name}" */'${resolve(cwd, name)}'))` :
          `require('${resolve(cwd, name)}')`;
      }

      return `{
        path: '${endpoint}',
        exact: true,
        component: ${page}
      }`;
    });


  return `
    import App from './components/App';
    import NotFoundPage from './pages/notFound';
    import asyncComponent from './decorators/asyncComponent';

    export default () => [
      {
        component: App,
        routes: [
          ${pages.map(item => `${item},`).join('')}
          {
            component: NotFoundPage
          }
        ]
      }
    ];
  `;
};
