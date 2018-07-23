import path from 'path';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import routes from './routes';
import { isPromise } from '../utils/typeof';

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(path.resolve('dist')))
  .get('*', (req, res) => {
    // 查找当前 URL 匹配的路由
    let props = {};
    matchRoutes(routes, req.url).forEach(async ({
      route,
      match,
      location,
      history
    }) => {
      const { component } = route;
      if (component && component.getInitialProps) {
        const ctx = {
          req,
          res,
          match,
          location,
          history
        };
        const { getInitialProps } = component;
        props = isPromise(getInitialProps) ? await getInitialProps(ctx) : getInitialProps(ctx);
      }
    });

    if (!process.env.WEBPACK_STATS_JSON) {
      throw new Error('Not found `WEBPACK_STATS_JSON` in `process.env`');
    }
    const { publicPath, chunks } = require(process.env.WEBPACK_STATS_JSON);
    // 获取初始化网页需要插入的 CSS/JS 静态文件
    const initialAssets = chunks
      .filter((item) => {
        const routeName = req.url.substring(1) || 'home';
        return item.initial || item.names[0] === routeName;
      })
      .reduce((accumulator, item) => {
        accumulator = accumulator.concat(item.files);
        return accumulator;
      }, []);

    const renderTags = (extension, assets) => {
      const getTagByFilename = filename => (filename.endsWith('js') ?
        `<script src=${publicPath + filename}></script>` :
        `<link rel="stylesheet" href=${publicPath + filename} />`);

      return assets
        .filter(item => !/\.hot-update\./.test(item)) // 过滤掉 HMR 包
        .filter(item => item.endsWith(extension))
        .map(item => getTagByFilename(item));
    };

    const jsTags = renderTags('js', initialAssets);
    const cssTags = renderTags('css', initialAssets);
    const helmet = Helmet.renderStatic();

    const context = {};
    const Markup = (
      <StaticRouter context={context} location={req.url}>
        {renderRoutes(routes, props)}
      </StaticRouter>
    );
    const markup = renderToString(Markup);

    if (context.url) {
      res.redirect(context.url);
    } else {
      const html = `<!doctype html>
  <html>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${cssTags}
  </head>
  <body>
    <div id="root">${markup}</div>
    <script>
      window.INITIAL_STATE=${serialize(props)};
    </script>
    ${jsTags}
  </body>
</html>`;
      res.status(200).send(html);
    }
  });

export default server;
