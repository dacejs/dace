import { combineReducers } from 'redux';

/**
 * @param {Object} - key/value of reducer functions
 */
const createReducer = (asyncReducers) => {
  // 开发环境下会报错，但线上不会
  const initReducers = {
    // foo: (state = {}) => state
  };

  return combineReducers({
    ...initReducers,
    ...asyncReducers
  });
};

export default createReducer;
