const { existsSync } = require('fs');
const { resolve } = require('path');
const glob = require('glob');

module.exports = () => {
  const cwd = resolve('src/pages');
  const pages = glob
    .sync('**/index.js', { cwd })
    .map(item => item.replace('/index.js', ''))
    .map((name) => {
      const routerFile = resolve(cwd, `${name}/router`);
      if (existsSync(routerFile)) {
        return 'require(routerFile)'; // eslint-disable-line
      }
      return `{
        path: '/${name}',
        component: asyncComponent(() => import(/* webpackChunkName: "${name}" */'${resolve(cwd, name)}'))
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
