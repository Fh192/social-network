import { IUser } from '../../types/users';

const SET_USERS = 'actions/users/SET_USERS';
const TOGGLE_FOLLOW = 'actions/users/TOGGLE_FOLLOW';

export const setUsers = (users: Array<IUser>, totalCount: number) =>
  ({ type: SET_USERS, payload: { users, totalCount } } as const);

export const toggleFollow = (userId: number, isFollowed: boolean) =>
  ({ type: TOGGLE_FOLLOW, payload: { userId, isFollowed } } as const);
