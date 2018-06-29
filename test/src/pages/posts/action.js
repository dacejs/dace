import { isLoaded, logger } from 'unjs';

export const FETCH_POSTS = 'fetch_posts';
export const fetchPosts = () => async (dispatch, getState, api) => {
  const { posts } = getState();
  if (!isLoaded(posts)) {
    try {
      const res = await api.get('/posts');
      dispatch({
        type: FETCH_POSTS,
        payload: res
      });
    } catch (e) {
      logger.error(`获取数据 /posts 出错\n${e}`);
    }
  } else {
    logger.info('state.posts已经获取过');
  }
};
