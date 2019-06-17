import path from 'path';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import { RedBoxError } from 'redbox-react';
import NotFound from './components/NotFound';
import addProxy from './utils/addProxy';
import addStatic from './utils/addStatic';
import document from './document';
import routes from './routes';

const server = express();

// 绑定请求代理
addProxy(server);

// 挂载虚拟目录
addStatic(server);

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
            if (component && component.load && typeof component.load === 'function') {
              // 预加载 @loadable/component
              // 确保服务器端第一次渲染时能拿到数据
              const AsyncComponent = (await component.load()).default;

              if (AsyncComponent.getInitialProps) {
                const ctx = { match, query, req, res };
                const props = await AsyncComponent.getInitialProps(ctx);
                return props;
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

      const context = {};
      const Markup = ssr ? (
        <StaticRouter context={context} location={req.url}>
          {renderRoutes(routes, { initialProps })}
        </StaticRouter>
      ) : null;

      // This is the stats file generated by webpack loadable plugin
      const statsFile = path.resolve(process.env.DACE_LOADABLE_STATS_JSON);
      // We create an extractor from the statsFile
      const extractor = new ChunkExtractor({ statsFile });
      // Wrap your application using "collectChunks"
      const jsx = extractor.collectChunks(Markup);

      let markup;
      let scriptTags;
      let styleTags;
      try {
        markup = renderToString(jsx);
        scriptTags = extractor.getScriptTags();
        styleTags = extractor.getStyleTags();
      } catch (error) {
        res.status(500);
        markup = renderToString(<RedBoxError error={error} />);
      }

      // renderStatic 需要在 root 元素 renderToString 后执行
      const head = Helmet.renderStatic();
      const state = serialize(initialProps);
      const html = document({
        head,
        markup,
        state,
        styleTags,
        scriptTags
      });
      res.status(200).end(html);
    }
  });

export default server;
