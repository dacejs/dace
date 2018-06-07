export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  const state = getState();
  if (state.users.length === 0) {
    const res = await api.get('/users');

    dispatch({
      type: FETCH_USERS,
      payload: res
    });
  } else {
    console.log('state.users已经获取过');
  }
};

export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');

  dispatch({
    type: FETCH_ADMINS,
    payload: res
  });
};
