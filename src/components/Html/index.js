/* eslint react/no-danger: 0, global-require: 0 */
import { existsSync } from 'fs';
import { resolve } from 'path';
import { error } from 'npmlog';
import chalk from 'chalk';
import { format } from 'util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import routes from '../../routes';
import { outputPath } from '../../config/dace';
import { isLocal, isProduction } from '../../utils';

/**
 * 服务器端渲染使用的入口组件
 *
 * @return {component}
 */
export default class Html extends Component {
  static propTypes = {
    ctx: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    const { ctx, context, store } = this.props;

    const getWebpackStats = () => {
      if (isLocal) {
        return ctx.state.webpackStats.toJson();
      }
      if (!existsSync(resolve(outputPath, 'webpack-stats.json'))) {
        const buildCommand = 'npm run build:client';
        const message = `找不到文件：${outputPath}/webpack-stats.json，请先运行 %s`;
        error('Html', message, chalk.magenta(buildCommand));
        if (!isProduction) {
          // 在浏览器中抛出异常，方便调试
          throw new Error(format(message, buildCommand));
        }
      }
      return require('webpack-stats.json'); // eslint-disable-line
    };
    const { publicPath, chunks } = getWebpackStats();
    // 获取初始化网页需要插入的 CSS/JS 静态文件
    const initialAssets = chunks
      .filter((item) => {
        const routeName = ctx.url.substring(1) || 'home';
        return item.initial || item.names[0] === routeName;
      })
      .reduce((accumulator, item) => {
        accumulator = accumulator.concat(item.files);
        return accumulator;
      }, []);

    const renderTags = (extension, assets) => {
      const getTagByFilename = filename => (filename.endsWith('js') ?
        <script src={publicPath + filename} key={filename} /> :
        <link rel="stylesheet" href={publicPath + filename} key={filename} />);

      return assets
        .filter(item => !/\.hot-update\./.test(item)) // 过滤掉 HMR 包
        .filter(item => item.endsWith(extension))
        .map(item => getTagByFilename(item));
    };

    const Root = (
      <Provider store={store}>
        <StaticRouter location={ctx.path} context={context}>
          {renderRoutes(routes(), { store })}
        </StaticRouter>
      </Provider>
    );
    const jsTags = renderTags('js', initialAssets);
    const cssTags = renderTags('css', initialAssets);
    const content = renderToString(Root);
    const helmet = Helmet.renderStatic();

    return (
      <html lang="zh-CN">
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {cssTags}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.firstRendering=true;window.INITIAL_STATE=${serialize(store.getState())};` }} charSet="UTF-8" />
          {jsTags}
        </body>
      </html>
    );
  }
}
