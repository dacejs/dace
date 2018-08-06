import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from 'dace/dist/core/routes';
import createStore from './createStore';

const store = createStore();
const mountNode = document.getElementById('root');

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes, { store })}
    </BrowserRouter>
  </Provider>,
  mountNode
);

if (module.hot) {
  module.hot.accept();
}

// if (process.env.NODE_ENV !== 'production') {
//   // 为了调试方便
//   window.React = React;
//
//   if (module.hot) {
//     module.hot.accept('./components/App', () => {
//       console.log('--accept: /components/App');
//       hydrate(
//         <Provider store={store}>
//           <BrowserRouter>
//             {renderRoutes(routes, { store })}
//           </BrowserRouter>
//         </Provider>,
//         mountNode
//       );
//       // hydrate(
//       //   <Provider store={store}>
//       //     <App />
//       //   </Provider>,
//       //   document.getElementById('root')
//       // );
//     });
//   }
// }
