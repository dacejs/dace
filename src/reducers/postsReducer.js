import { FETCH_POSTS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload.data.map(({ id, title }) => ({ id, title }));
    default:
      return state;
  }
};
