import { AxiosResponse } from 'axios';
import { IPhotos, ServerData } from '../types/common';
import { IContacts, IProfile, IProfileForUpdate } from '../types/profile';
import instance from './instance';

const profileAPI = {
  getUserProfile: async (userId: number): Promise<IProfile> => {
    const { data } = await instance.get<IProfile>(`profile/${userId}`);

    // remove unnecessary contacts
    const contacts = Object.fromEntries(
      Object.entries(data.contacts).filter(([name]) => {
        return name !== 'mainLink' && name !== 'website';
      })
    ) as IContacts;

    return { ...data, contacts };
  },
  updatePhoto: async (
    image: File
  ): Promise<ServerData<{ photos: IPhotos }>> => {
    const fr = new FormData();
    fr.append('image', image);

    const { data } = await instance.put<
      FormData,
      AxiosResponse<ServerData<{ photos: IPhotos }>>
    >('profile/photo', fr, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  },
  updateProfile: async (profileFormData: IProfile): Promise<ServerData> => {
    const { data } = await instance.put<
      IProfileForUpdate,
      AxiosResponse<ServerData>
    >('profile', profileFormData);

    return data;
  },
};

export default profileAPI;
