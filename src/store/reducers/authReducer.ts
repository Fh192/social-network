import { ThunkAction } from 'redux-thunk';
import auth from '../../api/auth';
import security from '../../api/security';
import { IAuthLogin } from '../../types/auth';
import * as actions from '../actions/auth';
import { Actions, RootState } from '../store';

type AuthState = typeof initialState;
type AuthActions = ReturnType<Actions<typeof actions>>;
type AuthThunk = ThunkAction<Promise<void>, RootState, unknown, AuthActions>;

const initialState = {
  id: null as number | null,
  email: '' as string,
  login: '' as string,
  captcha: '' as string,
};

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'actions/auth/SET_USER_AUTH_DATA':
      return { ...state, ...action.payload };

    case 'actions/auth/SET_CAPTCHA':
      return { ...state, captcha: action.payload };

    default:
      return state;
  }
};

export const getUserAuthData = (): AuthThunk => async dispatch => {
  try {
    const data = await auth.me();
    const userData = data.data;

    dispatch(actions.setUserAuthData(userData));
  } catch (e) {
    console.error(e);
  }
};

export const login =
  (loginFormData: IAuthLogin): AuthThunk =>
  async dispatch => {
    try {
      const data = await auth.login(loginFormData);

      if (data.resultCode === 0) {
        dispatch(getUserAuthData());
      } else if (data.resultCode === 10) {
        const captcha = await security.captcha();

        dispatch(actions.setCaptcha(captcha));
      } else {
        throw Error(data.messages.join());
      }
    } catch (e) {
      console.error(e);
    }
  };

export const logout = (): AuthThunk => async dispatch => {
  try {
    await auth.logout();
    dispatch(getUserAuthData());
  } catch (e) {
    console.error(e);
  }
};

export default authReducer;
