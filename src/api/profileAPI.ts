import { AxiosResponse } from 'axios';
import { IPhotos, ServerData } from '../types/common';
import { IContacts, IProfile, IProfileForUpdate } from '../types/profile';
import instance from './instance';

const profileAPI = {
  getUserProfile: async (userId: number | null) => {
    const response = await instance.get<IProfile>(`profile/${userId}`);
    const data = response.data;

    //remove unnecessary contacts
    const contacts = Object.fromEntries(
      Object.entries(data.contacts).filter(
        c => c[0] !== 'mainLink' && c[0] !== 'website'
      )
    ) as IContacts;

    return { ...data, contacts };
  },

  updatePhoto: async (image: File) => {
    interface Response extends ServerData {
      data: { photos: IPhotos };
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

    return response.data;
  },

  updateProfile: async (profileFormData: IProfile) => {
    const response = await instance.put<
      IProfileForUpdate,
      AxiosResponse<ServerData>
    >('/profile', profileFormData);

    return response.data;
  },
};

export default profileAPI;
