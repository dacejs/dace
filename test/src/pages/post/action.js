import { isLoaded } from 'unjs';

export const FETCH_POST = 'fetch_post';

export const fetchPost = id => async (dispatch, getState, api) => {
  const { post } = getState();
  if (!isLoaded(post)) {
    const res = await api.get(`/posts/${id}`);
    dispatch({
      type: FETCH_POST,
      payload: res
    });
  }
  // const state = getState();
  // if (!state.posts || state.posts.length === 0 || !state.posts.some(post => post.id === id)) {
  //   try {
  //     const res = await api.get(`/posts/${id}`);
  //     dispatch({
  //       type: FETCH_POST,
  //       payload: res
  //     });
  //   } catch (e) {
  //     console.error(`获取数据 /posts/${id} 出错\n${e}`);
  //   }
  // } else {
  //   console.log(`state.posts.${id} 已经获取过`);
  // }
};
