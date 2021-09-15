import { createReducer } from '@reduxjs/toolkit';
import { Actions, RootDispatch, RootState } from '../store';
import { IPhotos, Nullable } from '../../types/common';
import * as actions from '../actions/profile';
import { ThunkAction } from 'redux-thunk';
import { IContacts, IProfileForUpdate } from '../../types/profile';
import profileAPI from '../../api/profileAPI';
import followAPI from '../../api/followAPI';

type ProfileActions = ReturnType<Actions<typeof actions>>;
type ProfileState = typeof initialState;
type ProfileThunk = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  ProfileActions
>;

const initialState = {
  followed: false as boolean,
  inFollowProcess: false as boolean,
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

const profileReducer = createReducer(initialState, b => {
  b.addCase(actions.setUserProfile, (state, action) => {
    return { ...state, ...action.payload };
  });

  b.addCase(actions.updatePhoto, (state, action) => {
    state.photos = action.payload;
  });

  b.addCase(actions.setUserStatus, (state, action) => {
    state.status = action.payload;
  });

  b.addCase(actions.toggleFollowProcess, (state, action) => {
    state.inFollowProcess = action.payload;
  });

  b.addCase(actions.follow, state => {
    state.followed = true;
  });

  b.addCase(actions.unfollow, state => {
    state.followed = false;
  });
});

export const getUserProfile =
  (userId: number | null): ProfileThunk =>
  async dispatch => {
    const data = await profileAPI.getUserProfile(userId);
    const followed = await followAPI.getFollowed(userId as number);

    dispatch(actions.setUserProfile({ ...data, followed }));
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

export const toggleFollow =
  (userId: number) => async (dispatch: RootDispatch) => {
    dispatch(actions.toggleFollowProcess(true));
    const followed = await followAPI.getFollowed(userId);

    if (followed) {
      await followAPI.unfollow(userId);
      dispatch(actions.unfollow());
    } else {
      await followAPI.follow(userId);
      dispatch(actions.follow());
    }
    dispatch(actions.toggleFollowProcess(false));
  };

export default profileReducer;
