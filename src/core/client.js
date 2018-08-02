import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const initialProps = window.INITIAL_STATE || {};

hydrate(
  <BrowserRouter>
    {renderRoutes(routes, { initialProps })}
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
