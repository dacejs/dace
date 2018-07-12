import { isLoaded, logger } from 'dace';

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  const { users } = getState();
  if (!isLoaded(users)) {
    const res = await api.get('/users');

    dispatch({
      type: FETCH_USERS,
      payload: res
    });
  } else {
    logger.info('state.users已经获取过');
  }
};
