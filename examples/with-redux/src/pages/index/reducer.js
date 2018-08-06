import { FETCH_USERS } from './action';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      // 只能返回对象，不能返回数组
      return {
        ...state,
        users: action.payload.data.map(({ id, name }) => ({ id, name }))
      };
    default:
      return state;
  }
};
