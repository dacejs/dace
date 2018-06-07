import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

const axiosInstance = axios.create({
  baseURL: '/api'
});

/* eslint-disable no-underscore-dangle */
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;
/* eslint-enable */

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
);

const container = document.getElementById('root');
if (!container || !container.firstChild ||
  !container.firstChild.attributes ||
  !container.firstChild.attributes['data-reactroot']) {
  console.error('未使用 React 服务器端渲染，请确保初始化 render 方法中不包含任何浏览器端代码');
}

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(Routes)}
    </BrowserRouter>
  </Provider>,
  container
);
