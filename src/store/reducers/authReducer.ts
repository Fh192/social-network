import { createReducer } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import authAPI from '../../api/authAPI';
import securityAPI from '../../api/securityAPI';
import { IAuthLogin } from '../../types/auth';
import * as actions from '../actions/auth';
import { Actions, RootState } from '../store';
import { Nullable } from '../../types/common';

export type AuthState = typeof initialState;
export type AuthActions = ReturnType<Actions<typeof actions>>;
export type AuthThunk = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AuthActions
>;

const initialState = {
  id: null as Nullable<number>,
  email: '' as string,
  login: '' as string,
  captcha: '' as string,
  isAuth: false as boolean,
  errors: [] as Array<string>,
};

const {
  setUserAuthDataSuccess,
  setUserAuthDataFailure,
  setCaptchaSuccess,
  logoutSuccess,
} = actions;

const authReducer = createReducer(initialState, b => {
  b.addCase(setUserAuthDataSuccess, (state, action) => {
    return { ...state, ...action.payload, isAuth: true };
  });

  b.addCase(setUserAuthDataFailure, (state, action) => {
    state.errors.push(action.payload.error);
  });

  b.addCase(setCaptchaSuccess, (state, action) => {
    state.captcha = action.payload.captcha;
  });

  b.addCase(logoutSuccess, () => initialState);
});

export const getUserAuthData = (): AuthThunk => async dispatch => {
  try {
    const data = await authAPI.me();
    const userData = data.data;

    if (data.resultCode === 0) {
      dispatch(setUserAuthDataSuccess(userData));
    } else {
      throw new Error(...data.messages);
    }
  } catch (e) {
    if (typeof e === 'string') {
      dispatch(setUserAuthDataFailure(e));
    }
  }
};

export const login =
  (loginFormData: IAuthLogin): AuthThunk =>
  async dispatch => {
    try {
      const data = await authAPI.login(loginFormData);
      const resultCode = data.resultCode;

      if (resultCode === 0) {
        dispatch(getUserAuthData());
      } else if (resultCode === 10) {
        const captcha = await securityAPI.captcha();

        dispatch(setCaptchaSuccess(captcha));
      } else {
        throw Error(...data.messages);
      }
    } catch (e) {
      if (typeof e === 'string') {
        dispatch(setUserAuthDataFailure(e));
      }
    }
  };

export const logout = (): AuthThunk => async dispatch => {
  try {
    await authAPI.logout();

    dispatch(logoutSuccess());
  } catch (e) {
    console.error(e);
  }
};

export default authReducer;
