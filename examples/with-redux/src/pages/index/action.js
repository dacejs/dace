export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  // 数据是否需要缓存由开发者自己决定
  const { users } = getState();
  if (!users) {
    let res;
    try {
      res = await api.get('/api/users');
    } catch (e) {
      throw e;
    }
    return dispatch({
      type: FETCH_USERS,
      payload: res
    });
  }
  return null;
};
