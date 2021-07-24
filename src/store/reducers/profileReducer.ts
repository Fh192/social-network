import { Actions, RootState } from '../store';
import { IPhotos, Nullable } from '../../types/common';
import * as actions from '../actions/profile';
import { ThunkAction } from 'redux-thunk';
import { IContacts, IProfile, IProfileForUpdate } from '../../types/profile';
import profileAPI from '../../api/profileAPI';

type ProfileActions = ReturnType<Actions<typeof actions>>;
type ProfileState = typeof initialState;
type ProfileThunk = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  ProfileActions
>;

const initialState = {
  aboutMe: '' as Nullable<string>,
  userId: null as Nullable<number>,
  lookingForAJob: false as boolean,
  lookingForAJobDescription: null as Nullable<string>,
  fullName: '' as string,
  status: '' as string,
  contacts: {
    github: null as Nullable<string>,
    vk: null as Nullable<string>,
    facebook: null as Nullable<string>,
    instagram: null as Nullable<string>,
    twitter: null as Nullable<string>,
    website: null as Nullable<string>,
    youtube: null as Nullable<string>,
    mainLink: null as Nullable<string>,
  } as IContacts,
  photos: {
    small: null as Nullable<string>,
    large: null as Nullable<string>,
  } as IPhotos,
};

const profileReducer = (
  state = initialState,
  action: ProfileActions
): ProfileState => {
  switch (action.type) {
    case 'actions/profile/SET_USER_PROFILE':
      return { ...state, ...action.payload };

    case 'actions/profile/UPDATE_PHOTO':
      return { ...state, photos: { ...state.photos, ...action.payload } };

    case 'actions/profile/SET_USER_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const getUserProfile =
  (userId: number | null): ProfileThunk =>
  async dispatch => {
    const data = await profileAPI.getUserProfile(userId);

    dispatch(actions.setUserProfile(data));
  };

export const getUserStatus =
  (userId: number): ProfileThunk =>
  async dispatch => {
    const status = await profileAPI.getStatus(userId);

    dispatch(actions.setUserStatus(status));
  };

export const updateStatus =
  (status: string): ProfileThunk =>
  async dispatch => {
    const data = await profileAPI.updateStatus(status);

    if (data.resultCode === 0) {
      dispatch(actions.setUserStatus(status));
    }
  };

export const updatePhoto =
  (image: File, userId: number): ProfileThunk =>
  async dispatch => {
    const data = await profileAPI.updatePhoto(image);

    if (data.resultCode === 0) {
      const photos = data.data;
      dispatch(actions.updatePhoto(photos));
      dispatch(getUserProfile(userId));
    }
  };

export const updateProfile =
  (
    profileFormData: IProfileForUpdate,
    userId: Nullable<number>
  ): ProfileThunk =>
  async dispatch => {
    const data = await profileAPI.updateProfile(profileFormData);

    if (data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    }
  };

export default profileReducer;
