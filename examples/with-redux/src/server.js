import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import RedBox from 'dace/dist/core/components/RedBox';
import routes from 'dace/dist/core/routes';
import createStore from './createStore';

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.DACE_BUILD_PATH))
  .get('*', async (req, res) => {
    const store = createStore();
    // 查找当前 URL 匹配的路由
    const promises = matchRoutes(routes, req.url)
      .map(({ route, match, location, history }) => {
        const ctx = {
          store,
          req,
          res,
          match,
          location,
          history
        };
        const { getInitialProps } = route.component;
        return getInitialProps ? getInitialProps(ctx) : null;
      })
      .filter(Boolean);

    // 执行 getInitialProps ，在此之后的 store 中将包含数据
    await Promise.all(promises);

    if (!process.env.DACE_STATS_JSON) {
      throw new Error('Not found `DACE_STATS_JSON` in `process.env`');
    }
    const { publicPath, chunks } = require(process.env.DACE_STATS_JSON);
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
        .map(item => getTagByFilename(item))
        .join('');
    };

    const jsTags = renderTags('js', initialAssets);
    const cssTags = renderTags('css', initialAssets);
    const helmet = Helmet.renderStatic();

    const context = {};
    const Markup = (
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          {renderRoutes(routes, { store })}
        </StaticRouter>
      </Provider>
    );

    let markup;
    try {
      markup = renderToString(Markup);
    } catch (e) {
      // ctx.status = 500;
      res.status(500);
      markup = renderToString(<RedBox error={e} />);
    }


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
      window.INITIAL_STATE=${serialize(store.getState())};
    </script>
    ${jsTags}
  </body>
</html>`;
      res.status(200).send(html);
    }
  });

export default server;
