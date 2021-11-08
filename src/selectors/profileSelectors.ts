import { RootState as S } from '../store';

export const getProfile = (state: S) => state.profile;

export const selectIsOwner = (state: S) => {
  return state.profile.userId === state.auth.id;
};
