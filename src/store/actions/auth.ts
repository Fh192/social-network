import { IUserData } from '../../types/auth';

const SET_USER_AUTH_DATA = 'actions/auth/SET_USER_AUTH_DATA';
const SET_CAPTCHA = 'actions/auth/SET_CAPTCHA';

export const setUserAuthData = (userData: IUserData) =>
  ({ type: SET_USER_AUTH_DATA, payload: userData } as const);

export const setCaptcha = (captcha: string) =>
  ({ type: SET_CAPTCHA, payload: captcha } as const);
