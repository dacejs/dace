/* eslint global-require: 0, import/no-dynamic-require: 0 */
/**
 * 该文件仅在 node-require 环境下运行
 * 当 webpack-require 时，走的是 routesLoader
 */
import { existsSync } from 'fs';
import { resolve } from 'path';
import glob from 'glob';
import App from './components/App';
import NotFoundPage from './pages/notFound';

export default () => {
  const routes = [{ component: NotFoundPage }];
  const cwd = resolve('src/pages');
  glob
    .sync('**/index.js', { cwd })
    .forEach((item) => {
      let endpoint;
      let page;

      const name = item.replace('/index.js', '');
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
        page = require(resolve(cwd, name));
      }

      routes.unshift({
        path: endpoint,
        exact: true,
        component: page
      });
    });

  return [
    {
      component: App,
      routes
    }
  ];
};
