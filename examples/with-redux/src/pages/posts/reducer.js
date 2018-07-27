import { FETCH_POSTS } from './action';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        posts: action.payload.data.map(({ id, title }) => ({ id, title })),
        ...state
      };
    default:
      return state;
  }
};
