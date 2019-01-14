import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { getLoadableState } from 'loadable-components/server';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import document from './document';
import RedBox from './components/RedBox';
import routes from './routes';

const server = express();

// 当 publicPath = '/' 需要将编译目录挂载为虚拟目录（本地开发模式）
if (process.env.DACE_PUBLIC_PATH === '/') {
  server.use(express.static(process.env.DACE_CLIENT_BUILD));
}

server
  .disable('x-powered-by')
  .get('*', async (req, res) => {
    // 查找当前 URL 匹配的路由
    let initialProps = {};
    const { query, _parsedUrl: { pathname } } = req;
    const noSSR = process.env.DACE_NO_SSR === 'true';

    if (!noSSR) {
      const promises = matchRoutes(routes, pathname) // <- react-router 不匹配 querystring
        .map(async ({ route, match }) => {
          const { component } = route;
          if (component) {
            if (component.load && !component.loadingPromise) {
              // 预加载 loadable-component
              // 确保服务器端第一次渲染时能拿到数据
              await component.load();
            }
            if (component.getInitialProps) {
              const ctx = { match, query, req, res };
              const { getInitialProps } = component;
              return getInitialProps ? getInitialProps(ctx) : null;
            }
          }
          return null;
        })
        .filter(Boolean);

      if (promises.length > 0) {
        (await Promise.all(promises)).forEach((item) => {
          initialProps = { ...initialProps, ...item };
        });
      }
    }

    if (!process.env.DACE_STATS_JSON) {
      throw new Error('Not found `DACE_STATS_JSON` in `process.env`');
    }

    // 获取初始化网页需要插入的 CSS/JS 静态文件
    const { publicPath, chunks } = require(process.env.DACE_STATS_JSON);
    let files = [];
    // 输出入口文件
    const [root] = chunks.filter(chunk => chunk.initial && chunk.parents.length === 0);
    files = files.concat(root.files);

    // 输出公共文件
    const vendors = chunks.filter(chunk => chunk.initial && chunk.parents.length > 0);
    vendors.forEach((vendor) => {
      files = files.concat(vendor.files);
    });

    // 根据当前路由反查页面对应的组件
    let currentPage;
    matchRoutes(routes, pathname).forEach(({ route }) => {
      // 找到了页面
      if (route.path) {
        const { component: { componentId } } = route;
        currentPage = componentId.replace(`${process.env.DACE_PAGES}/`, '');
      }
    });

    if (currentPage) {
      const [page] = chunks.filter(chunk => !chunk.initial && chunk.names[0] === currentPage);
      // 只包含一个页面时不会拆分打包，所有文件会打到 main.js 里
      if (page && page.files) {
        files = files.concat(page.files);
      }
    }

    // const initialAssets = chunks
    //   .filter((item) => {
    //     const routeName = req.url.substring(1) || process.env.DACE_INDEX;
    //     const routeNameWithIndex = `${routeName}/${process.env.DACE_INDEX}`;
    //     // 将 vendor.js、styles.css、路由对应的.js 直接输出到 HTML 中
    //     return item.initial ||
    //       [routeName, routeNameWithIndex, 'styles'].indexOf(item.names[0]) > -1;
    //   })
    //   .reduce((accumulator, item) => {
    //     accumulator = accumulator.concat(item.files);
    //     return accumulator;
    //   }, []);

    const renderTags = (extension, assets) => {
      const getTagByFilename = filename => (filename.endsWith('js') ?
        `<script src="${publicPath + filename}" crossorigin="anonymous"></script>` :
        `<link rel="stylesheet" href="${publicPath + filename}" />`);

      return assets
        .filter(item => !/\.hot-update\./.test(item)) // 过滤掉 HMR 包
        // .filter(item => !/styles.[^.]{8}.chunk.js/.test(item)) // 过滤掉 styles.js
        .filter(item => item.endsWith(extension))
        .map(item => getTagByFilename(item))
        .join('');
    };

    const jsTags = renderTags('js', files);
    const cssTags = renderTags('css', files);

    const context = {};
    const Markup = noSSR ? null : (
      <StaticRouter context={context} location={req.url}>
        {renderRoutes(routes, { initialProps })}
      </StaticRouter>
    );

    const loadableState = await getLoadableState(Markup);

    let markup;
    try {
      markup = renderToString(Markup);
    } catch (e) {
      res.status(500);
      markup = renderToString(<RedBox error={e} />);
    }

    // renderStatic 需要在 root 元素 render 后执行
    // 禁用服务器端渲染时，head meta 也不渲染
    const head = process.env.DACE_NO_SSR === 'false' ?
      Helmet.renderStatic() : {
        htmlAttributes: { toString: () => '' },
        title: { toString: () => '' },
        meta: { toString: () => '' },
        link: { toString: () => '' },
        style: { toString: () => '' },
        script: { toString: () => '' },
        noscript: { toString: () => '' },
        bodyAttributes: { toString: () => '' }
      };
    const state = serialize(initialProps);

    if (context.url) {
      res.redirect(context.url);
    } else {
      const html = document({
        head,
        cssTags,
        jsTags,
        markup,
        state,
        loadableState: loadableState.getScriptTag()
      });
      res.status(200).end(html);
    }
  });

export default server;
