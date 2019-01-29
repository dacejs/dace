export const FETCH_POSTS = 'fetch_posts';
export const fetchPosts = (page = 1) => async (dispatch, getState, api) => {
  let res;
  try {
    res = await api.get(`/api/posts?page=${page}`);
  } catch (e) {
    throw e;
  }
  return dispatch({
    type: FETCH_POSTS,
    payload: res
  });
};
