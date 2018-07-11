import { logger } from 'unjs';

export const FETCH_POST = 'fetch_post';
export const CLEAN_POST = 'clean_post';

export const fetchPost = id => async (dispatch, getState, api) => {
  try {
    const res = await api.get(`/posts/${id}`);
    dispatch({
      type: FETCH_POST,
      payload: res
    });
  } catch (e) {
    logger.error(`获取数据 /posts/${id} 出错\n${e}`);
  }
};

export const cleanPost = () => async (dispatch) => {
  dispatch({
    type: CLEAN_POST
  });
};
