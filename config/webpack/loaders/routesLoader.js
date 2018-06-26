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
      const routerFile = resolve(cwd, `${name}/router.js`);
      if (existsSync(routerFile)) {
        return `require('${routerFile}')`;
      }

      const component = options.forceEnv === 'client' ?
        `asyncComponent(() => import(/* webpackChunkName: "${name}" */'${resolve(cwd, name)}'))` :
        `require('${resolve(cwd, name)}')`;

      return `{
        path: '/${name}',
        component: ${component}
      }`;
    });


  return `
    import App from './components/App';
    import NotFoundPage from './pages/notFound';
    import asyncComponent from './components/AsyncComponent';

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
