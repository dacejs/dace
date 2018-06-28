import path from 'path';
import chalk from 'chalk';
import { info, warn, error } from 'npmlog';
import Koa from 'koa';
import serve from 'koa-static';
import proxy from 'koa-proxies';
import middleware from 'koa-webpack';
import webpack from 'webpack';
import { matchRoutes } from 'react-router-config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import getPort from 'get-port';
import routes from './routes';
import createStore from './createStore';
import Html from './components/Html';
import RedBox from './components/RedBox';
import { isLocal } from './utils';
import random from './utils/random';
import { host, port, outputPath, ApiUrl } from './config/unjs';

const app = new Koa();

const { UNIT_TEST } = process.env; // 运行测试用例

if (isLocal) {
  const dev = { serverSideRender: true };
  const hot = { port: random(4) };
  const config = require('./config/webpack/dev'); // eslint-disable-line
  const compiler = webpack(config);
  const middlewareOptions = { compiler, dev, hot };
  if (UNIT_TEST) {
    middlewareOptions.dev.logLevel = 'silent';
    middlewareOptions.hot = false;
  }
  app.use(middleware(middlewareOptions));
} else {
  app.use(serve(path.resolve(outputPath)));
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
    .map(({ route, match }) => {
      const { getInitialProps } = route.component;
      return getInitialProps ? getInitialProps(store, match, ctx.query) : null;
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
  getPort({ port }).then((availablePort) => {
    if (availablePort !== port) {
      warn('server', `默认端口（${port}）已被占用，将随机端口（${availablePort}）启动 web 服务`);
    }
    app.listen(availablePort, (err) => {
      if (err) {
        error('server', `==> 😭  OMG!!! ${err}`);
      } else {
        info('server', '==> 🎉  Ready on %s', chalk.blue.underline(`http://${host}:${availablePort}`));
      }
    });
  });
}

export default app;
