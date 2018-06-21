import { FETCH_USERS, FETCH_CURRENT_USER } from './action';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data.map(({ id, name }) => ({ id, name }));
    case FETCH_CURRENT_USER:
      return action.payload.data || false;
    default:
      return state;
  }
};
