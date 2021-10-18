import { AxiosResponse } from 'axios';
import { IPhotos, ServerData } from '../types/common';
import { IProfile, IProfileForUpdate } from '../types/profile';
import instance from './instance';

const profileAPI = {
  getUserProfile: async (userId: number | null) => {
    const response = await instance.get<IProfile>(`profile/${userId}`);

    return response.data;
  },

  getStatus: async (userId: number) => {
    const response = await instance.get<string>(`/profile/status/${userId}`);

    return response.data;
  },

  updateStatus: async (status: string) => {
    const response = await instance.put<
      { status: string },
      AxiosResponse<ServerData>
    >('/profile/status', {
      status,
    });

    return response.data;
  },

  updatePhoto: async (image: File) => {
    interface Response extends ServerData {
      data: IPhotos;
    }

    const fr = new FormData();
    fr.append('image', image);

    const response = await instance.put<FormData, AxiosResponse<Response>>(
      '/profile/photo',
      fr,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    debugger;

    return response.data;
  },

  updateProfile: async (profileFormData: IProfileForUpdate) => {
    const response = await instance.put<
      IProfileForUpdate,
      AxiosResponse<ServerData>
    >('/profile', profileFormData);

    return response.data;
  },
};

export default profileAPI;
