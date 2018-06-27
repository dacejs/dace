import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import proxy from 'koa-proxies';
import middleware from 'koa-webpack';
import webpack from 'webpack';
import { matchRoutes } from 'react-router-config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import routes from './routes';
import createStore from './createStore';
import Html from './components/Html';
import RedBox from './components/RedBox';
import { isLocal } from './utils';
import { host, port, dist, ApiUrl } from './config/unjs';

const app = new Koa();

const { UNIT_TEST } = process.env; // 运行测试用例

if (isLocal) {
  const dev = { serverSideRender: true };
  const config = require('./config/webpack/dev'); // eslint-disable-line
  const compiler = webpack(config);
  const middlewareOptions = { compiler, dev };
  if (UNIT_TEST) {
    middlewareOptions.dev.logLevel = 'silent';
    middlewareOptions.hot = false;
  }
  app.use(middleware(middlewareOptions));
} else {
  app.use(serve(path.resolve(dist)));
}

app.use(proxy('/api', {
  target: ApiUrl,
  rewrite: url => url.replace(/^\/api/, ''),
  changeOrigin: true,
  logs: true
}));

app.use(async (ctx) => {
  const store = createStore();
  const promises = matchRoutes(routes(), ctx.path)
    .map(({ route }) => {
      const { getInitialProps } = route.component;
      return getInitialProps ? getInitialProps(store) : null;
    })
    .filter(promise => !!promise)
    .map(promise => new Promise((resolve) => {
      promise.then(resolve).catch(resolve);
    }));

  await Promise.all(promises).then(() => {
    const context = {};
    let html;
    try {
      html = renderToString(<Html ctx={ctx} context={context} store={store} />);
    } catch (e) {
      ctx.status = 500;
      html = renderToString(<RedBox error={e} />);
    }

    if (context.url) {
      return ctx.redirect(301, context.url);
    }
    if (context.notFound) {
      ctx.status = 404;
    }

    ctx.body = `<!doctype html>\n${html}`;
    return true;
  });
});

if (!UNIT_TEST) {
  app.listen(port, (err) => {
    if (err) {
      console.error(`==> 😭  OMG!!! ${err}`);
    } else {
      console.info(`==> 💻  http://${host}:${port}`);
    }
  });
}

export default app;
