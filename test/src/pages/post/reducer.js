import { FETCH_POST, CLEAN_POST } from './action';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST:
      return action.payload.data;
    case CLEAN_POST:
      return {};
    default:
      return state;
  }
};
