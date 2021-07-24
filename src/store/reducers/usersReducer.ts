import usersAPI from './../../api/usersAPI';
import { Nullable } from './../../types/common';
import { ThunkAction } from 'redux-thunk';
import { IUser } from '../../types/users';
import * as actions from '../actions/users';
import { Actions, RootState } from '../store';
import followAPI from '../../api/followAPI';

type UsersState = typeof initialState;
type UsersActions = ReturnType<Actions<typeof actions>>;
type UsersThunk = ThunkAction<Promise<void>, RootState, unknown, UsersActions>;

const initialState = {
  users: [] as Array<IUser>,
  totalCount: null as Nullable<number>,
};

const usersReducer = (
  state = initialState,
  action: UsersActions
): UsersState => {
  switch (action.type) {
    case 'actions/users/SET_USERS':
      return {
        ...state,
        users: [...state.users, ...action.payload.users],
        totalCount: action.payload.totalCount,
      };

    case 'actions/users/TOGGLE_FOLLOW':
      return {
        ...state,
        users: [
          ...state.users.map(user => {
            if (user.id === action.payload.userId) {
              user.followed = action.payload.isFollowed;
            }

            return user;
          }),
        ],
      };

    default:
      return state;
  }
};

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
    const isFollowed = await followAPI.getFollowed(userId);

    if (isFollowed) {
      await followAPI.unfollow(userId);
      dispatch(actions.toggleFollow(userId, false));
    } else {
      await followAPI.follow(userId);
      dispatch(actions.toggleFollow(userId, true));
    }
  };

export default usersReducer;
