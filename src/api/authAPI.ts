import { IAuthLogin, IAuthMe } from '../types/auth';
import { ServerData } from '../types/common';
import instance from './instance';

const authAPI = {
  me: async () => {
    const response = await instance.get<IAuthMe>('auth/me');

    return response.data;
  },

  login: async (loginFormData: IAuthLogin) => {
    const response = await instance.post<ServerData>(
      'auth/login',
      loginFormData
    );

    return response.data;
  },

  logout: async () => {
    await instance.delete('auth/login');
  },
};

export default authAPI;
