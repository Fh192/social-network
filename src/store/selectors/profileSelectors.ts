import { RootState as S } from '..';

export const getProfile = (state: S): S['profile'] => state.profile;

export const selectIsOwner = (state: S): boolean => {
  return state.profile.userId === state.auth.id;
};
