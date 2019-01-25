import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { getLoadableState } from 'loadable-components/server';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import { RedBoxError } from 'redbox-react';
import NotFound from './components/NotFound';
import renderTags from './utils/renderTags';
import document from './document';
import routes from './routes';

const server = express();

// 当 publicPath = '/' 需要将编译目录挂载为虚拟目录（本地开发模式）
if (process.env.DACE_PUBLIC_PATH === '/') {
  server.use(express.static(process.env.DACE_PATH_CLIENT_DIST));
}

server
  .disable('x-powered-by')
  .get('*', async (req, res) => {
    // 查找当前 URL 匹配的路由
    const { query, _parsedUrl: { pathname } } = req;
    const ssr = process.env.DACE_SSR === 'true';
    const branch = matchRoutes(routes, pathname);
    // 匹配的最后一个组件是 `NotFound` 的话，表示地址不存在
    const notFound = branch[branch.length - 1].route.component.name === 'NotFound';

    if (notFound) {
      const html = document({
        markup: renderToString(<NotFound location={{ pathname }} />)
      });
      res.status(200).end(html);
    } else {
      let initialProps = {};
      if (ssr) {
        const promises = branch // <- react-router 不匹配 querystring
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
          // 将取回的数据追加到 pros
          (await Promise.all(promises)).forEach((item) => {
            initialProps = { ...initialProps, ...item };
          });
        }
      }

      const jsTags = renderTags(branch, 'js');
      const cssTags = renderTags(branch, 'css');

      const context = {};
      const Markup = ssr ? (
        <StaticRouter context={context} location={req.url}>
          {renderRoutes(routes, { initialProps })}
        </StaticRouter>
      ) : null;

      const loadableState = await getLoadableState(Markup);

      let markup;
      try {
        markup = renderToString(Markup);
      } catch (error) {
        res.status(500);
        markup = renderToString(<RedBoxError error={error} />);
      }

      // renderStatic 需要在 root 元素 renderToString 后执行
      const head = Helmet.renderStatic();
      const state = serialize(initialProps);
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
