import { IPhotos, IProfile } from '../../types/profile';

const SET_USER_PROFILE = 'actions/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'actions/profile/SET_USER_STATUS';
const UPDATE_PHOTO = 'actions/profile/UPDATE_PHOTO';

export const setUserProfile = (profile: IProfile) =>
  ({ type: SET_USER_PROFILE, payload: profile } as const);

export const setUserStatus = (status: string) =>
  ({ type: SET_USER_STATUS, payload: status } as const);

export const updatePhoto = (photos: IPhotos) =>
  ({ type: UPDATE_PHOTO, payload: photos } as const);

