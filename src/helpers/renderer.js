import { existsSync } from 'fs';
import { resolve } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../Routes';

const IS_DEV = process.env.NODE_ENV === 'local';

export default (ctx, store, context) => {
  const getWebpackStats = () => {
    const assetManifest = resolve('dist/webpack-stats.json');
    if (IS_DEV) {
      return ctx.state.webpackStats.toJson();
    } else if (existsSync(assetManifest)) {
      return require(assetManifest); // eslint-disable-line
    }
    throw new Error(`找不到文件：${assetManifest}，请先运行 \`npm run build\``);
  };
  const { publicPath, assetsByChunkName } = getWebpackStats();

  const renderChunks = (extension, chunks) => {
    const getTagByFilename = filename => (filename.endsWith('js') ?
      <script src={publicPath + filename} key={filename} /> :
      <link rel="stylesheet" href={publicPath + filename} key={filename} />);

    return Object.keys(chunks).reduce((accumulator, key) => {
      if (Array.isArray(chunks[key])) {
        chunks[key]
          .filter(item => !/\.hot-update\./.test(item)) // 过滤掉 HMR 包
          .filter(item => item.endsWith(extension))
          .forEach((item) => {
            accumulator.push(getTagByFilename(item));
          });
      } else if (chunks[key].endsWith(extension)) {
        accumulator.push(getTagByFilename(chunks[key]));
      }
      return accumulator;
    }, []);
  };

  const Root = (
    <Provider store={store}>
      <StaticRouter location={ctx.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
  const jsTags = renderToString(renderChunks('js', assetsByChunkName));
  const cssTags = renderToString(renderChunks('css', assetsByChunkName));
  const content = renderToString(Root);

  const helmet = Helmet.renderStatic();

  return `<!DOCTYPE html>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${cssTags}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        ${jsTags}
      </body>
    </html>
  `;
};
