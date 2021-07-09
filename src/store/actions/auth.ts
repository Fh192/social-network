import { IUserData } from '../../types/auth';

const SET_USER_AUTH_DATA = 'actions/auth/SET_USER_AUTH_DATA';
const SET_CAPTCHA = 'actions/auth/SET_CAPTCHA';
const LOGOUT_SUCCESS = 'actions/auth/LOGOUT_SUCCESS';
const SET_AUTH_ERRORS = 'actions/auth/SET_AUTH_ERRORS';

export const setUserAuthData = (userData: IUserData) =>
  ({ type: SET_USER_AUTH_DATA, payload: userData } as const);

export const setCaptcha = (captcha: string) =>
  ({ type: SET_CAPTCHA, payload: captcha } as const);

export const logoutSuccess = (userData: IUserData) =>
  ({
    type: LOGOUT_SUCCESS,
    payload: userData,
  } as const);

export const setAuthErrors = (errors: Array<string>) =>
  ({
    type: SET_AUTH_ERRORS,
    payload: errors,
  } as const);
