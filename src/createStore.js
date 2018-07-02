import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { isClient } from './utils';
import createReducer from './rootReducer';
import { ApiUrl } from './config/unjs';
import pagesObject from './nodeAddons/getPagesName';

  posts: [],
let a = pagesObject;
if (typeof a === 'function') {
  a = JSON.stringify(pagesObject({ rootContext: process.cwd() }));
}
a = JSON.parse(a);

// {
//   users: [],
//   posts: [],
//   post: {}
// };

export const defaultState = a.pages.reduce((state, page) => {
  state[page] = (page === 'post') ? {} : [];
  return state;
}, {});

// export const defaultState = {
//   users: [],
//   posts: [],
//   post: {}
// };

export default () => {
  const baseURL = isClient ? '/api' : ApiUrl;
  const initialState = isClient ? window.INITIAL_STATE : defaultState;
  const axiosInstance = axios.create({
    baseURL
    // headers: { cookie: req.get('cookie') || '' }
  });

  /* eslint-disable */
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
  );

  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  };

  return store;
};
