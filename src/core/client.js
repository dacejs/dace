import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { loadableReady } from '@loadable/component';
import routes from './routes';

const initialProps = window.INITIAL_STATE || {};

loadableReady(() => {
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
