import { ADD_USER } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          name: action.name
        }
      ]
    default:
      return state
  }
};
