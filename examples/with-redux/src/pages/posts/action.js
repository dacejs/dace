export const FETCH_POSTS = 'fetch_posts';
export const fetchPosts = (page = 1) => async (dispatch, getState, api) => {
  const res = await api.get(`http://jsonplaceholder.typicode.com/posts?_page=${page}`);
  return dispatch({
    type: FETCH_POSTS,
    payload: res
  });
};
