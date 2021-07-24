import { ServerData } from './../types/common';
import instance from './instance';

const followAPI = {
  getFollowed: async (userId: number) => {
    const response = await instance.get<boolean>(`follow/${userId}`);
    return response.data;
  },
  follow: async (userId: number) => {
    const response = await instance.post<ServerData>(`follow/${userId}`);
    return response.data;
  },
  unfollow: async (userId: number) => {
    const response = await instance.delete<ServerData>(`follow/${userId}`);
    return response.data;
  },
};

export default followAPI;
