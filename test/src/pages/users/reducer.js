import { FETCH_USERS } from './action';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data.map(({ id, name }) => ({ id, name }));
    default:
      return state;
  }
};
