import { RootState } from '../store';
import { Nullable } from '../types/common';
import { IUser } from '../types/users';

export const selectUsersState = (state: RootState): RootState['users'] =>
  state.users;

export const selectUsers = (state: RootState): IUser[] => state.users.users;

export const selectUsersTotalCount = (state: RootState): Nullable<number> =>
  state.users.totalCount;
