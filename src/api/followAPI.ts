import { ServerData } from './../types/common';
import instance from './instance';

const followAPI = {
  getFollowed: async (userId: number): Promise<boolean> => {
    const { data } = await instance.get<boolean>(`follow/${userId}`);

    return data;
  },
  follow: async (userId: number): Promise<ServerData> => {
    const { data } = await instance.post<ServerData>(`follow/${userId}`);

    return data;
  },
  unfollow: async (userId: number): Promise<ServerData> => {
    const { data } = await instance.delete<ServerData>(`follow/${userId}`);

    return data;
  },
};

export default followAPI;
