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

export interface ProfileState {
  followed: boolean;
  inFollowProcess: boolean;
  aboutMe: Nullable<string>;
  userId: Nullable<number>;
  lookingForAJob: boolean;
  lookingForAJobDescription: Nullable<string>;
  fullName: string;
  status: string;
  contacts: IContacts;
  photos: IPhotos;
}

const initialState: ProfileState = {
  followed: false,
  inFollowProcess: false,
  aboutMe: '',
  userId: null,
  lookingForAJob: false,
  lookingForAJobDescription: null,
  fullName: '',
  status: '',
  contacts: {
    github: null,
    vk: null,
    facebook: null,
    instagram: null,
    twitter: null,
    youtube: null,
  },
  photos: {
    small: null,
    large: null,
  },
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

    const profile = await profileAPI.getUserProfile(userId);
    let followed = false;

    if (ownerId !== userId) {
      followed = await followAPI.getFollowed(userId);
    }

    dispatch(actions.setUserProfile({ ...profile, followed }));
  };

export const updatePhoto =
  (image: File): ProfileThunk =>
  async dispatch => {
    const { data, resultCode } = await profileAPI.updatePhoto(image);

    if (resultCode === 0) {
      dispatch(actions.setUserPhoto(data.photos));
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
