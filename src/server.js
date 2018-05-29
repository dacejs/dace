import './require-hook';
import { existsSync } from 'fs';
import { resolve } from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import middleware from 'koa-webpack';
import webpack from 'webpack';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';
import webpackConfig from '../webpack/dev.config.babel';
import App from './components/App';

const IS_DEV = process.env.NODE_ENV === 'local';
const host = 'localhost';
const port = '3000';

const app = new Koa();

if (IS_DEV) {
  const dev = { serverSideRender: true };
  const compiler = webpack(webpackConfig);
  app.use(middleware({ compiler, dev }));
} else {
  app.use(serve(resolve('dist')));
}

app.use(async (ctx) => {
  const getWebpackStats = () => {
    const assetManifest = resolve('./webpack-stats.json');
    if (IS_DEV) {
      return ctx.state.webpackStats.toJson();
    } else if (existsSync(assetManifest)) {
      return require(assetManifest);
    } else {
      throw new Error(`找不到文件：${assetManifest}，请先运行 \`npm run build\``);
    }
  }
  const { publicPath, assetsByChunkName } = getWebpackStats(); // IS_DEV ? ctx.state.webpackStats.toJson() : require('../asset-manifest.json');

  const renderChunks = (extension, chunks) => {
    const getTagByFilename = filename => filename.endsWith('js') ?
      <script src={publicPath + filename} key={filename}></script> :
      <link rel="stylesheet" href={publicPath + filename} key={filename} />;

    return Object.keys(chunks).reduce((context, key) => {
      if (Array.isArray(chunks[key])) {
        chunks[key]
          .filter(item => !/\.hot-update\./.test(item)) // 过滤掉 HMR 包
          .filter(item => item.endsWith(extension))
          .forEach((item) => {
            context.push(getTagByFilename(item));
          });
      } else if (chunks[key].endsWith(extension)) {
        context.push(getTagByFilename(chunks[key]));
      }
      return context;
    }, [])
  };

  const helmet = Helmet.rewind();

  const html = ReactDOM.renderToString(
    <html>
      <head>
        { helmet.title.toComponent() }
        { helmet.meta.toComponent() }
        { helmet.link.toComponent() }
        { renderChunks('css', assetsByChunkName) }
      </head>
      <body>
        <div id="app">
          <StaticRouter
            location={ctx.url}
            context={ctx}
          >
            <App/>
          </StaticRouter>
        </div>
        <div>{JSON.stringify(assetsByChunkName)}</div>
        { renderChunks('js', assetsByChunkName) }
      </body>
    </html>
  );
  ctx.body = `<!DOCTYPE html>${html}`;
});

app.listen(port, (err) => {
  if (err) {
    console.error(`==> 😭  OMG!!! ${err}`);
  } else {
    console.info(`==> 💻  http://${host}:${port}`);
  }
});
