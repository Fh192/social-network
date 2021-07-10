import { ServerData } from './../types/common';
import { IPhotos, IProfile, IProfileFormData } from '../types/profile';
import instance from './instance';

const profile = {
  getUserProfile: async (userId: number) => {
    const response = await instance.get<IProfile>(`profile/${userId}`);

    return response.data;
  },

  getStatus: async (userId: number) => {
    const response = await instance.get<string>(` /profile/status/${userId}`);

    return response.data;
  },

  updateStatus: async (status: string) => {
    const response = await instance.put<ServerData>('/profile/status', {
      status,
    });

    return response.data;
  },

  updatePhoto: async (image: FormData) => {
    interface Response extends ServerData {
      data: IPhotos;
    }

    const response = await instance.put<Response>('/profile/photo', { image });

    return response.data;
  },

  updateProfile: async (profile: IProfileFormData) => {
    const response = await instance.put<ServerData>('/profile', { profile });

    return response.data;
  },
};

export default profile;
