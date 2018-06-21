import { combineReducers } from 'redux';

/**
 * @param {Object} - key/value of reducer functions
 */
const createReducer = asyncReducers =>
  combineReducers({
    // combin一个空对象会报错，用 foo 避免报错
    foo: (state = {}) => state,
    ...asyncReducers
  });

export default createReducer;
