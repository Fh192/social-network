import { RootState } from '../store';

export const selectUsersState = (state: RootState) => state.users;

export const selectUsers = (state: RootState) => state.users.users;

export const selectUsersTotalCount = (state: RootState) =>
  state.users.totalCount;

