import { ServerData } from './common';

export interface IAuthMe extends ServerData {
  data: {
    id: number;
    email: string;
    login: string;
  };
}

export interface IAuthLogin extends ServerData {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}

export interface IUserData {
  id: number | null;
  email: string;
  login: string;
}
