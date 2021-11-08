import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import profileReducer from './profileReducer';
import usersSlice from './usersSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  users: usersSlice,
});

export default rootReducer;
