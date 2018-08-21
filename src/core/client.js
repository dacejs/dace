import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import routes from './daceRoutes';

const initialProps = window.INITIAL_STATE || {};

hydrate(
  <BrowserRouter>
    {renderRoutes(routes, { initialProps, routes })}
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
