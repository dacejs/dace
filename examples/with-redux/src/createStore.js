import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';
import mergeable from 'redux-merge-reducers';

/**
 * 创建 store
 *
 * @return {store}
 */
export default () => {
  // const baseURL = isClient ? '/api' : ApiUrl;
  const isClient = typeof window === 'object';
  const initialState = isClient ? window.INITIAL_STATE : {};
  const axiosInstance = axios.create({
    // baseURL
    // headers: { cookie: req.get('cookie') || '' }
  });

  // 初始化使用的默认 reducer
  const initialReducer = (state = {}) => state;
  const store = createStore(
    initialReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
  );

  // 保存已经存在于 store 中的 reducer ，以便于后续 replaceReducer 时使用
  store.reducers = initialReducer;
  store.injectReducer = (newReducer) => {
    // 将新增的 reducer 和已经存在的 reducer 合并
    // 注意：
    // 这里不使用 combineReducer
    // 因为 combineReducer 需要一开始就把 store 的形状确定好（MUST be a shaped store）
    // 而实际上我们希望页面初始时什么都没有，所有资源都是懒加载
    const mergedReducer = mergeable(newReducer).merge(store.reducers);
    store.replaceReducer(mergedReducer);
    store.reducers = mergedReducer;
    return store;
  };

  return store;
};
