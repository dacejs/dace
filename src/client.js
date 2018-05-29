import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './components/App';

const dest = document.getElementById('app');
if (!dest || !dest.firstChild) {
  console.error('未使用React服务器端渲染，确保初始化 render 方法中不包含任何浏览器端代码');
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  dest
);

if (module.hot) {
  module.hot.accept();
}
