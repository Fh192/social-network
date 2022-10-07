import { createAction as qwe } from '@reduxjs/toolkit';
import { IUser } from '../../types/users';

export const setUsers = qwe(
  'users/SET_USERS',
  (users: Array<IUser>, totalCount: number) => ({
    payload: { users, totalCount },
  })
);

export const toggleFollow = qwe(
  'users/TOGGLE_FOLLOW',
  (userId: number) => ({ payload: { userId } })
);

export const setCurrentPage = qwe(
  'users/SET_CURRENT_PAGE',
  (page: number) => ({ payload: { page } })
);

export const addUserToFollowProgress = qwe(
  'users/ADD_USER_TO_FOLLOW_PROGRESS',
  (id: number) => ({ payload: { id } })
);
