import { combineReducers } from 'redux';

/**
 * @param {Object} asyncReducers 需要动态加载的 reducer 键值对
 * @param {Object} combineReducers 合并后新的 reducers
 */
export default (asyncReducers) => {
  // 开发环境下会报错，但线上不会
  const initReducers = {
    foo: (state = {}) => state
  };

  return combineReducers({
    ...initReducers,
    ...asyncReducers
  });
};
