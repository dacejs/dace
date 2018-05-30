import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import test from './reducers';

// 通过服务端注入的全局变量得到初始 state
const preloadedState = window.__INITIAL_STATE__;

// 使用初始 state 创建 Redux store
const store = createStore(test, preloadedState)

const container = document.getElementById('app');
if (!container || !container.firstChild ||
  !container.firstChild.attributes ||
  !container.firstChild.attributes['data-reactroot']) {
  console.error('未使用 React 服务器端渲染，请确保初始化 render 方法中不包含任何浏览器端代码');
}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  container
);

if (module.hot) {
  module.hot.accept();
}
