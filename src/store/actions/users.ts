import { IUser } from '../../types/users';

const SET_USERS = 'actions/users/SET_USERS';
const TOGGLE_FOLLOW = 'actions/users/TOGGLE_FOLLOW';
const SET_CURRENT_PAGE = 'actions/users/SET_CURRENT_PAGE';

export const setUsers = (users: Array<IUser>, totalCount: number) =>
  ({ type: SET_USERS, payload: { users, totalCount } } as const);

export const toggleFollow = (userId: number, isFollowed: boolean) =>
  ({ type: TOGGLE_FOLLOW, payload: { userId, isFollowed } } as const);

export const setCurrentPage = (page: number) =>
  ({ type: SET_CURRENT_PAGE, payload: page } as const);
