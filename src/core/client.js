import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { loadComponents } from 'loadable-components';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const initialProps = window.INITIAL_STATE || {};

// 在渲染前加载好所需要的组件
loadComponents().then(() => {
  hydrate(
    <BrowserRouter>
      {renderRoutes(routes, { initialProps, routes })}
    </BrowserRouter>,
    document.getElementById('root')
  );
});

if (module.hot) {
  module.hot.accept();
}
