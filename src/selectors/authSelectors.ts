import { RootState } from '../store';

export const getAuthState = (state: RootState): RootState['auth'] => state.auth;
