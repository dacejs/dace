import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
  posts: postsReducer
});
