import api from '.';
import { ServerData } from './../types/common';

const followAPI = {
  getFollowed: async (userId: number): Promise<boolean> => {
    const { data } = await api.get<boolean>(`follow/${userId}`);

    return data;
  },
  follow: async (userId: number): Promise<ServerData> => {
    const { data } = await api.post<ServerData>(`follow/${userId}`);

    return data;
  },
  unfollow: async (userId: number): Promise<ServerData> => {
    const { data } = await api.delete<ServerData>(`follow/${userId}`);

    return data;
  },
};

export default followAPI;
