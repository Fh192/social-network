import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UsersState } from '../reducers/usersSlice';

export const selectUsersState = (state: RootState): UsersState => state.users;

export const selectUsers = (state: RootState): UsersState['users'] =>
  state.users.users;

export const selectUsersTotalCount = (
  state: RootState
): UsersState['totalCount'] => state.users.totalCount;

export const selectUsersInFollowingProgress = (
  state: RootState
): UsersState['inFollowProgress'] => state.users.inFollowProgress;

export const selectIsUserInFollowingProgress = createSelector(
  [selectUsersInFollowingProgress, (s: RootState, userId: number) => userId],
  (usersInFollowingProgress, userId): boolean =>
    usersInFollowingProgress.some(id => id === userId)
);
