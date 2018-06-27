import { combineReducers } from 'redux';
// import { isClient } from './utils';

/**
 * @param {Object} - key/value of reducer functions
 */
const createReducer = (asyncReducers) => {
  const initReducers = {
    // combin一个空对象会报错，用 foo 避免报错
    foo: (state = {}) => state
  };
  // if (isClient) {
  //   initReducers.users = (state = {}) => state;
  // }

  return combineReducers({
    ...initReducers,
    ...asyncReducers
  });
};

export default createReducer;
