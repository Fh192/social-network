import { RootState } from '../store/store';

export const getAuthState = (state: RootState): RootState['auth'] => state.auth;
