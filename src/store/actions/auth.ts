import { createAction } from '@reduxjs/toolkit';
import { IUserData } from '../../types/auth';

export const setUserAuthDataSuccess = createAction<IUserData>(
  'actions/auth/SET_USER_AUTH_DATA_SUCCESS'
);

export const setUserAuthDataFailure = createAction(
  'actions/auth/SET_USER_AUTH_DATA_FAILURE',
  (error: string) => ({ payload: { error } })
);

export const setCaptchaSuccess = createAction(
  'actions/auth/SET_CAPTCHA_SUCCESS',
  (captcha: string) => ({ payload: { captcha } })
);

export const setCaptchaFailure = createAction(
  'actions/auth/SET_CAPTCHA_FAILURE',
  (error: string) => ({ payload: { error } })
);

export const logoutSuccess = createAction('actions/auth/LOGOUT_SUCCESS');
