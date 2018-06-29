import { combineReducers } from 'redux';
import { defaultState } from './createStore';

/**
 * @param {Object} - key/value of reducer functions
 */
const createReducer = (asyncReducers) => {
  const initReducers = Object.keys(defaultState).reduce((total, value) => {
    total[value] = (state = {}) => state;
    return total;
  }, {});

  return combineReducers({
    ...initReducers,
    ...asyncReducers
  });
};

export default createReducer;
