import { combineReducers } from 'redux';
import pagesInfo from '../preval/getPages';

/**
 * @param {Object} asyncReducers 需要动态加载的 reducer 键值对
 * @param {Object} combineReducers 合并后新的 reducers
 */
export default (asyncReducers) => {
  const initReducers = pagesInfo.pages.reduce((reducers, value) => {
    reducers[value] = (state = {}) => state;
    return reducers;
  }, {});
  if (Object.keys(initReducers).length === 0) {
    initReducers.foo = (state = {}) => state;
  }

  return combineReducers({
    ...initReducers,
    ...asyncReducers
  });
};
