import { FETCH_POSTS } from './action';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        data: action.payload.data.map(({ id, title }) => ({ id, title }))
      };
    default:
      return state;
  }
};
