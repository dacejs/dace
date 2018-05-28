import './require-hook';
import Koa from 'koa';
import webpack from 'webpack';
import middleware from 'koa-webpack';
import React from 'react';
import ReactDOM from 'react-dom/server';
import webpackConfig from '../webpack/dev.config.babel';
import Hello from './components/Hello';

const host = 'localhost';
const port = '3000';

const app = new Koa();

const compiler = webpack(webpackConfig);
const dev = { serverSideRender: true };
app.use(middleware({ compiler, dev }));

app.use(async (ctx) => {
  const chunks = ctx.state.webpackStats.toJson().assetsByChunkName;
  const html = ReactDOM.renderToString(
    <div id="app">
      <Hello />
      <p>{JSON.stringify(chunks)}</p>
      {Object.keys(chunks).map(key => <script src={chunks[key]}></script>)}
    </div>
  );
  ctx.body = `<!doctype html>\n${html}`;
});

app.listen(port, (err) => {
  if (err) {
    console.error(`==> 😭  OMG!!! ${err}`);
  } else {
    console.info(`==> 💻  http://${host}:${port}`);
  }
});
