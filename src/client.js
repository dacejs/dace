import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './components/App';

const container = document.getElementById('app');
if (!container || !container.firstChild ||
  !container.firstChild.attributes ||
  !container.firstChild.attributes['data-reactroot']) {
  console.error('未使用 React 服务器端渲染，请确保初始化 render 方法中不包含任何浏览器端代码');
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  container
);

if (module.hot) {
  module.hot.accept();
}
