import api from '.';
import { IGetUsersParams, IUsersResponse } from './../types/users';

const usersAPI = {
  getUsers: async (payload: IGetUsersParams): Promise<IUsersResponse> => {
    const params = new URLSearchParams();
    const entries = Object.entries(payload);

    entries.forEach(([key, value]) => {
      if (value !== undefined) params.set(key, value.toString());
    });

    const { data } = await api.get<IUsersResponse>(`users?${params}`);

    return data;
  },
};

export default usersAPI;
