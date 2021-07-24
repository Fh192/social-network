import { IProfile } from './../types/profile';
import { RootState } from '../store/store';

export const getProfile = (state: RootState): IProfile => state.profile;

export const getIsOwner = (state: RootState): boolean => {
  return state.profile.userId === state.auth.id;
};
