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
  isAuth: false as boolean,
  errors: [] as Array<string>,
};

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'actions/auth/SET_USER_AUTH_DATA':
      return { ...state, ...action.payload, isAuth: true };

    case 'actions/auth/SET_CAPTCHA':
      return { ...state, captcha: action.payload };

    case 'actions/auth/LOGOUT_SUCCESS':
      return { ...state, ...action.payload, isAuth: false };

    case 'actions/auth/SET_AUTH_ERRORS': {
      return { ...state, errors: action.payload };
    }

    default:
      return state;
  }
};

export const getUserAuthData = (): AuthThunk => async dispatch => {
  try {
    const data = await auth.me();
    const userData = data.data;

    if (data.resultCode === 0) {
      dispatch(actions.setUserAuthData(userData));
    } else {
      throw new Error(...data.messages);
    }
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

        dispatch(actions.setAuthErrors(data.messages));
        dispatch(actions.setCaptcha(captcha));
      } else {
        dispatch(actions.setAuthErrors(data.messages));
        throw Error(...data.messages);
      }
    } catch (e) {
      console.error(e);
    }
  };

export const logout = (): AuthThunk => async dispatch => {
  try {
    await auth.logout();

    dispatch(actions.logoutSuccess({ id: null, email: '', login: '' }));
  } catch (e) {
    console.error(e);
  }
};

export default authReducer;
