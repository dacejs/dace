import { FETCH_POST } from './action';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POST:
      // console.log('--action.payload.data:', action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
};
