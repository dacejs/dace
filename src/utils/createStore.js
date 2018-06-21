import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../reducer';
import { isClient } from '../utils';

export default (/* ctx */) => {
  const baseURL = isClient ? '/api' : 'http://jsonplaceholder.typicode.com';
  const initialState = isClient ? window.INITIAL_STATE : {};
  const composeEnhancers = compose;

  const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL
    // headers: { cookie: req.get('cookie') || '' }
  });

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
  );

  return store;
};
