import { createAction } from '@reduxjs/toolkit';
import { IPhotos } from '../../types/common';
import { IProfile } from '../../types/profile';

export const setUserProfile = createAction<IProfile>(
  'profile/SET_USER_PROFILE'
);

export const setUserPhoto = createAction<IPhotos>('profile/SET_USER_PHOTO');

export const toggleFollow = createAction<boolean>('profile/TOGGLE_FOLLOW');

export const toggleFollowProcess = createAction<boolean>(
  'profile/TOGGLE_FOLLOW_PROCESS'
);
