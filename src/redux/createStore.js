/* eslint no-underscore-dangle: 0 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { isClient } from '../utils';
import createReducer from './rootReducer';
// import { ApiUrl } from '../config/dace';

/**
 * 创建 store
 *
 * @return {store}
 */
export default () => {
  // const baseURL = isClient ? '/api' : ApiUrl;
  const initialState = isClient ? window.INITIAL_STATE : {};
  const axiosInstance = axios.create({
    // baseURL
    // headers: { cookie: req.get('cookie') || '' }
  });

  const composeEnhancers =
    isClient && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose;

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
