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
      const name = item.replace('/index.js', '');
      const routerFile = resolve(cwd, `${name}/router.js`);
      const endpoint = name === 'home' ? '' : name;
      if (existsSync(routerFile)) {
        routes.unshift(require(routerFile)); // eslint-disable-line
      } else {
        // 动态创建 router 模块
        routes.unshift({
          path: `/${endpoint}`,
          component: require(resolve(cwd, name)) // eslint-disable-line
        });
      }
    });

  return [
    {
      component: App,
      routes
    }
  ];
};
