import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import authAPI from '../../api/authAPI';
import securityAPI from '../../api/securityAPI';
import { IAuthLogin } from '../../types/auth';
import { Nullable } from '../../types/common';
import { UserData } from './../../types/auth';

export type AuthState = typeof initialState;

const initialState = {
  id: null as Nullable<number>,
  email: '' as string,
  login: '' as string,
  captcha: '' as string,
  isAuth: false as boolean,
  loginError: '' as string,
  captchaFetching: false,
};

export const getCaptcha = createAsyncThunk<string>(
  'auth/getCaptcha',
  async (_, { rejectWithValue }) => {
    try {
      const captcha = await securityAPI.captcha();
      return captcha;
    } catch (e) {
      return rejectWithValue('');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getUserAuthData = createAsyncThunk<UserData, void>(
  'auth/getUserAuthData',
  async () => {
    const data = await authAPI.me();
    const userData = data.data;

    if (data.resultCode === 0) {
      return userData;
    } else {
      throw new Error(...data.messages);
    }
  }
);

export const login = createAsyncThunk<void, IAuthLogin>(
  'auth/login',
  async (loginFormData, { dispatch, rejectWithValue }) => {
    try {
      const data = await authAPI.login(loginFormData);
      const resultCode = data.resultCode;

      if (resultCode === 0) {
        dispatch(getUserAuthData());
      } else {
        if (resultCode === 10) dispatch(getCaptcha());
        throw new Error(data.messages[0]);
      }
    } catch (err) {
      const e: Error = err as Error;
      return rejectWithValue(e.message);
    }
  }
);

const authReducer = createReducer(initialState, b => {
  b.addCase(getUserAuthData.fulfilled, (state, action) => {
    return { ...state, ...action.payload, isAuth: true };
  });

  b.addCase(getCaptcha.fulfilled, (state, action) => {
    state.captcha = action.payload;
    state.captchaFetching = false;
  });

  b.addCase(getCaptcha.pending, state => {
    state.captchaFetching = true;
  });

  b.addCase(login.rejected, (state, action) => {
    state.loginError = action.payload as string;
  });

  b.addCase(login.fulfilled, state => {
    state.loginError = '';
  });

  b.addCase(logout.fulfilled, () => initialState);
});

export default authReducer;
