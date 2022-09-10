import { createReducer } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { Actions, RootDispatch, RootState } from '..';
import followAPI from '../../api/followAPI';
import profileAPI from '../../api/profileAPI';
import { IPhotos, Nullable } from '../../types/common';
import { IContacts, IProfile } from '../../types/profile';
import * as actions from '../actions/profile';

type ProfileActions = ReturnType<Actions<typeof actions>>;
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
    youtube: null as Nullable<string>,
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

  b.addCase(actions.setUserPhoto, (state, action) => {
    state.photos = action.payload;
  });

  b.addCase(actions.toggleFollowProcess, (state, action) => {
    state.inFollowProcess = action.payload;
  });

  b.addCase(actions.toggleFollow, (state, action) => {
    state.followed = action.payload;
    state.inFollowProcess = false;
  });
});

export const getUserProfile =
  (userId: number): ProfileThunk =>
  async (dispatch, getState) => {
    const { id: ownerId } = getState().auth;
    dispatch(actions.setUserProfile(initialState));

    const data = await profileAPI.getUserProfile(userId);
    const followed =
      ownerId !== userId ? await followAPI.getFollowed(userId) : false;

    dispatch(actions.setUserProfile({ ...data, followed }));
  };

export const updatePhoto =
  (image: File): ProfileThunk =>
  async dispatch => {
    const { data, resultCode } = await profileAPI.updatePhoto(image);

    if (resultCode === 0) {
      const photos = data.photos;
      dispatch(actions.setUserPhoto(photos));
    }
  };

export const updateProfile =
  (updates: Partial<IProfile>): ProfileThunk =>
  async (_, getState) => {
    const { profile } = getState();
    await profileAPI.updateProfile({ ...profile, ...updates });
  };

export const toggleFollow =
  (userId: number) => async (dispatch: RootDispatch) => {
    dispatch(actions.toggleFollowProcess(true));
    const followed = await followAPI.getFollowed(userId);

    if (followed) {
      await followAPI.unfollow(userId);
    } else {
      await followAPI.follow(userId);
    }

    dispatch(actions.toggleFollow(!followed));
  };

export default profileReducer;
