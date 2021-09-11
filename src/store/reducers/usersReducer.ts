import { createReducer } from '@reduxjs/toolkit';
import usersAPI from './../../api/usersAPI';
import { Nullable } from './../../types/common';
import { ThunkAction } from 'redux-thunk';
import { IUser } from '../../types/users';
import * as actions from '../actions/users';
import { Actions, RootState } from '../store';
import followAPI from '../../api/followAPI';

export type UsersState = typeof initialState;
export type UsersActions = ReturnType<Actions<typeof actions>>;
export type UsersThunk = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  UsersActions
>;

const initialState = {
  users: [] as Array<IUser>,
  totalCount: null as Nullable<number>,
  inFollowProgress: [] as number[],
};

const usersReducer = createReducer(initialState, b => {
  b.addCase(actions.setUsers, (state, action) => {
    state.users.push(...action.payload.users);
    state.totalCount = action.payload.totalCount;
  });

  b.addCase(actions.toggleFollow, (state, action) => {
    state.users = state.users.map(user => {
      if (user.id === action.payload.userId) {
        user.followed = !user.followed;
      }
      return user;
    });

    state.inFollowProgress = state.inFollowProgress.filter(
      id => id !== action.payload.userId
    );
  });

  b.addCase(actions.addUserToFollowProgress, (state, action) => {
    state.inFollowProgress.push(action.payload.id);
  });
});

export const getUsers =
  (
    count?: number,
    page?: number,
    term?: string,
    friend?: boolean
  ): UsersThunk =>
  async dispatch => {
    const data = await usersAPI.getUsers(count, page, term, friend);
    const users = data.items;

    dispatch(actions.setUsers(users, data.totalCount));
  };

export const toggleFollow =
  (userId: number): UsersThunk =>
  async dispatch => {
    dispatch(actions.addUserToFollowProgress(userId));

    const isFollowed = await followAPI.getFollowed(userId);

    if (isFollowed) {
      await followAPI.unfollow(userId);
    } else {
      await followAPI.follow(userId);
    }

    dispatch(actions.toggleFollow(userId));
  };

export default usersReducer;
