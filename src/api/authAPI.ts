import { AxiosResponse } from 'axios';
import api from '.';
import { IAuthLogin, IAuthMe } from '../types/auth';
import { ServerData } from '../types/common';

const authAPI = {
  me: async (): Promise<IAuthMe> => {
    const { data } = await api.get<IAuthMe>('auth/me');

    return data;
  },
  login: async (loginFormData: IAuthLogin): Promise<ServerData> => {
    const { data } = await api.post<IAuthLogin, AxiosResponse<ServerData>>(
      'auth/login',
      loginFormData
    );

    return data;
  },
  logout: async (): Promise<void> => {
    await api.delete('auth/login');
  },
};

export default authAPI;
