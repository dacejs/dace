export const FETCH_POSTS = 'fetch_posts';
export const fetchPosts = () => async (dispatch, getState, api) => {
  const state = getState();
  if (!state.posts || state.posts.length === 0) {
    try {
      const res = await api.get('/posts');
      dispatch({
        type: FETCH_POSTS,
        payload: res
      });
    } catch (e) {
      console.error(`获取数据 /posts 出错\n${e}`);
    }
  } else {
    console.log('state.posts已经获取过');
  }
};
