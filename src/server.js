import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import proxy from 'koa-proxies';
import middleware from 'koa-webpack';
import webpack from 'webpack';
import { matchRoutes } from 'react-router-config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import webpackConfig from '../webpack/client.babel';
import routes from './routes';
import createStore from './helpers/createStore';
import Html from './helpers/Html';
import RedBox from './helpers/RedBox';
import { isLocal } from './utils';

const host = 'localhost';
const port = 3001;

const app = new Koa();

if (isLocal) {
  const dev = { serverSideRender: true };
  const compiler = webpack(webpackConfig);
  app.use(middleware({ compiler, dev }));
} else {
  app.use(serve(path.resolve('dist')));
}

app.use(proxy('/api', {
  target: 'http://jsonplaceholder.typicode.com',
  rewrite: url => url.replace(/^\/api/, ''),
  changeOrigin: true,
  logs: true
}));

app.use(async (ctx) => {
  const store = createStore(ctx);
  const promises = matchRoutes(routes, ctx.path)
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

app.listen(port, (err) => {
  if (err) {
    console.error(`==> 😭  OMG!!! ${err}`);
  } else {
    console.info(`==> 💻  http://${host}:${port}`);
  }
});
