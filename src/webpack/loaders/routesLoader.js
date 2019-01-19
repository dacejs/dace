/* eslint global-require: 0, import/no-dynamic-require: 0 */
/**
 * 该文件为 target='web' 提供文件系统操作能力
 * 当  target='web' 时，`require('./routes')` 返回的内容为该 loader 返回的内容
 */
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import glob from 'glob';

const { DACE_INDEX, DACE_PATH_SRC, DACE_PATH_PAGES } = process.env;

export default () => {
  function getEndpointFromPath(pagePath) {
    let endpoint = `/${pagePath}`;
    while (endpoint.endsWith(`/${DACE_INDEX}`)) {
      endpoint = endpoint.replace(`/${DACE_INDEX}`, '');
    }
    return endpoint || '/';
  }

  function getComponentPath(file) {
    const appComponent = resolve(DACE_PATH_SRC, `components/${file}.js`);
    if (existsSync(appComponent)) {
      return appComponent;
    }
    return resolve(__dirname, `../../runtime/components/${file}.js`);
  }

  const pageExtension = '.jsx';
  const routes = glob
    .sync(`**/*${pageExtension}`, { cwd: DACE_PATH_PAGES })
    .map(item => item.replace(pageExtension, ''))
    .map((name) => {
      const pathWithoutExtension = resolve(DACE_PATH_PAGES, name);

      let endpoint;
      let exact;
      // 当存在路由文件时，页面的路由地址以路由文件中配置的 path 为准
      const routerFile = resolve(dirname(pathWithoutExtension), 'router.js');
      if (existsSync(routerFile)) {
        const config = require(routerFile);
        endpoint = config.path;
        exact = config.exact || 'false';
      } else {
        endpoint = getEndpointFromPath(name);
        exact = (endpoint === '/').toString();
      }

      return (`{
        path: '${endpoint}',
        exact: ${exact},
        component: loadable(() => import(/* webpackChunkName: "${name}" */ '${pathWithoutExtension}'))
      }`);
    });

  // 在 routes 最后添加 404 找不到网页的路由
  // routes.push(`{
  //   component: require('${getComponentPath('NotFound')}')
  // }`);

  return `
    import loadable from 'loadable-components';
    export default [
      {
        component: require('${getComponentPath('App')}'),
        routes: [
          ${routes.join(',')}
        ]
      }
    ];
  `;
};
