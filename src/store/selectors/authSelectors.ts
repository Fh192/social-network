import { RootState } from '..';

export const getAuthState = (state: RootState): RootState['auth'] => state.auth;
