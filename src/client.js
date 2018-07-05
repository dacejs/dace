import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import createStore from './redux/createStore';
import { isProduction } from './utils';

const container = document.getElementById('root');
if (!container || !container.firstChild ||
  !container.firstChild.attributes ||
  !container.firstChild.attributes['data-reactroot']) {
  console.error('未使用 React 服务器端渲染，请确保初始化 render 方法中不包含任何浏览器端代码');
}

if (!isProduction) {
  window.React = React; // 为了调试方便
}

const store = createStore();

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes(), { store })}
    </BrowserRouter>
  </Provider>,
  container
);
