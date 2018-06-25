import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { isClient } from './utils';
import createReducer from './rootReducer';
import { ApiUrl } from '../config/unjs';

const initializeStore = () => {
  const baseURL = isClient ? '/api' : ApiUrl;
  const initialState = isClient ? window.INITIAL_STATE : {};

  // 根据服务器端拍回来的数据决定浏览器端初始化 store 需要引入哪些 reducer
  // 这里约定每个页面在 store 中存储的 key 为页面的 URL
  const asyncReducers = {};
  if (isClient && window.INITIAL_STATE) {
    Object.keys(window.INITIAL_STATE).filter(key => key !== 'foo').forEach((key) => {
      asyncReducers[key] = require(`./pages/${key}/reducer`); //eslint-disable-line
    });
  }

  const axiosInstance = axios.create({
    baseURL
    // headers: { cookie: req.get('cookie') || '' }
  });

  /* eslint-disable */
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(asyncReducers),
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

export default initializeStore;
