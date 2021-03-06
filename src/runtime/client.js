import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { renderRoutes } from 'react-router-config';
import routes from './ssrRoutes';

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
