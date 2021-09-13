import { createAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/users';

export const setUsers = createAction(
  'users/SET_USERS',
  (users: Array<IUser>, totalCount: number) => ({
    payload: { users, totalCount },
  })
);

export const toggleFollow = createAction(
  'users/TOGGLE_FOLLOW',
  (userId: number) => ({ payload: { userId } })
);

export const setCurrentPage = createAction(
  'users/SET_CURRENT_PAGE',
  (page: number) => ({ payload: { page } })
);

export const addUserToFollowProgress = createAction(
  'users/ADD_USER_TO_FOLLOW_PROGRESS',
  (id: number) => ({ payload: { id } })
);

export const setInitialState = createAction('users/SET_INITIAL_STATE');
