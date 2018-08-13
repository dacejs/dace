import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import RedBox from './components/RedBox';
import routes from './routes';

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.DACE_BUILD_PATH))
  .get('*', async (req, res) => {
    // 查找当前 URL 匹配的路由
    let initialProps = {};
    const { query, _parsedUrl: { pathname } } = req;

    const promises = matchRoutes(routes, pathname) // <- react-router 不匹配 querystring
      .map(({ route, match }) => {
        const { component } = route;
        if (component && component.getInitialProps) {
          const ctx = { match, query };
          const { getInitialProps } = component;
          return getInitialProps ? getInitialProps(ctx) : null;
        }
        return null;
      })
      .filter(Boolean);

    (await Promise.all(promises)).forEach((item) => {
      initialProps = { ...initialProps, ...item };
    });

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

    const helmetToString = head => ['title', 'meta', 'link', 'style', 'script', 'noscript']
      .filter(key => head[key])
      .map(key => head[key].toString())
      .join('');

    const jsTags = renderTags('js', initialAssets);
    const cssTags = renderTags('css', initialAssets);

    const context = {};
    const Markup = (
      <StaticRouter context={context} location={req.url}>
        {renderRoutes(routes, { initialProps })}
      </StaticRouter>
    );

    let markup;
    try {
      markup = renderToString(Markup);
    } catch (e) {
      // ctx.status = 500;
      res.status(500);
      markup = renderToString(<RedBox error={e} />);
    }

    // renderStatic 需要在 root 元素 render 后执行
    const helmet = Helmet.renderStatic();

    if (context.url) {
      res.redirect(context.url);
    } else {
      const html = `<!doctype html>
  <html ${helmet.htmlAttributes.toString()}>
  <head>
    <meta charset="utf-8" />
    ${helmetToString(helmet)}
    ${cssTags}
    <link rel="icon" type="image/png" href="//m.qunar.com/zhuanti/dace-logo-200.png" />
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="root">${markup}</div>
    <script>
      window.INITIAL_STATE=${serialize(initialProps)};
    </script>
    ${jsTags}
  </body>
</html>`;
      res.status(200).end(html);
    }
  });

export default server;
