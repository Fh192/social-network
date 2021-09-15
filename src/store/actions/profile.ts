import { createAction } from '@reduxjs/toolkit';
import { IPhotos } from '../../types/common';
import { IProfile } from '../../types/profile';

export const setUserProfile = createAction<IProfile>(
  'profile/SET_USER_PROFILE'
);

export const setUserStatus = createAction<string>('profile/SET_USER_STATUS');

export const updatePhoto = createAction<IPhotos>('profile/UPDATE_PHOTO');
