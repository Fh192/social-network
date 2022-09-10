import { AxiosResponse } from 'axios';
import { IAuthLogin, IAuthMe } from '../types/auth';
import { ServerData } from '../types/common';
import instance from './instance';

const authAPI = {
  me: async (): Promise<IAuthMe> => {
    const { data } = await instance.get<IAuthMe>('auth/me');

    return data;
  },

  login: async (loginFormData: IAuthLogin): Promise<ServerData> => {
    const { data } = await instance.post<IAuthLogin, AxiosResponse<ServerData>>(
      'auth/login',
      loginFormData
    );

    return data;
  },

  logout: async (): Promise<void> => {
    await instance.delete('auth/login');
  },
};

export default authAPI;
