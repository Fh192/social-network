import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  users: usersReducer,
});

export default rootReducer;
