export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  const { users } = getState();
  if (!users) {
    const res = await api.get('http://jsonplaceholder.typicode.com/users');
    return dispatch({
      type: FETCH_USERS,
      payload: res
    });
  }
  return null;
};
