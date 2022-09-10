import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersAPI from '../../api/usersAPI';
import { Nullable } from '../../types/common';
import { IGetUsersParams, IUser } from '../../types/users';
import followAPI from '../../api/followAPI';

const initialState = {
  users: [] as Array<IUser>,
  totalCount: null as Nullable<number>,
  inFollowProgress: [] as number[],
  errors: {
    follow: false,
    users: false,
  },
};

export const getUsers = createAsyncThunk<
  { users: IUser[]; totalCount: number },
  IGetUsersParams
>('getUsers', async ({ count, page, term, friend }, { rejectWithValue }) => {
  try {
    const data = await usersAPI.getUsers(count, page, term, friend);
    const { items: users, totalCount } = data;

    return { users, totalCount };
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const toggleFollow = createAsyncThunk<number, number>(
  'toggleFollow',
  async (userId: number, { rejectWithValue }) => {
    try {
      const isFollowed = await followAPI.getFollowed(userId);

      if (isFollowed) {
        await followAPI.unfollow(userId);
      } else {
        await followAPI.follow(userId);
      }

      return userId;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setInitialState: () => initialState,
  },

  extraReducers: b => {
    b.addCase(getUsers.fulfilled, (state, action) => {
      const { users, totalCount } = action.payload;
      state.users.push(...users);
      state.totalCount = totalCount;
      state.errors.users = false;
    });

    b.addCase(toggleFollow.fulfilled, (state, action) => {
      const userId = action.payload;
      const userIndex = state.users.findIndex(user => user.id === userId);
      const user = state.users[userIndex];

      user.followed = !user.followed;
      state.inFollowProgress = state.inFollowProgress.filter(
        id => id !== userId
      );
      state.errors.follow = false;
    });

    b.addCase(toggleFollow.pending, (state, action) => {
      const userId = action.meta.arg;
      state.inFollowProgress.push(userId);
    });
  },
});

export const { setInitialState } = usersReducer.actions;
export default usersReducer.reducer;
