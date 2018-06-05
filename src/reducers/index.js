import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import adminsReducer from './adminsReducer';

export default combineReducers({
  users: usersReducer,
  admins: adminsReducer
});
