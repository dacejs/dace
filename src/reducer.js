import { combineReducers } from 'redux';
import usersReducer from './pages/users/reducer';
import postsReducer from './pages/posts/reducer';

export default combineReducers({
  users: usersReducer,
  posts: postsReducer
});
