export const FETCH_POSTS = 'fetch_posts';
export const fetchPosts = () => async (dispatch, getState, api) => {
  const { posts } = getState();
  if (!posts) {
    const res = await api.get('http://jsonplaceholder.typicode.com/posts');
    return dispatch({
      type: FETCH_POSTS,
      payload: res
    });
  }
  return null;
};
