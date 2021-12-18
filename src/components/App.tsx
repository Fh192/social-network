import React, {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useDarkMode } from 'usehooks-ts';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
import { getAuthState } from '../selectors/authSelectors';
import { getUserAuthData } from '../store/reducers/authReducer';
import './App.css';
import Chat from './Chat/Chat';
import { Menu } from './Menu/Menu';
import Preloader from './Preloader/Preloader';
import { Profile } from './Profile/Profile';

const NotFound = lazy(() => import('./NotFound/NotFound'));
const Login = lazy(() => import('./Login/Login'));
const Users = lazy(() => import('./Users/Users'));
const Dialogs = lazy(() => import('./Dialogs/Dialogs'));
const EditProfile = lazy(() => import('./Profile/EditProfile/EditProfile'));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, id } = useSelector(getAuthState);
  const { isDarkMode } = useDarkMode(false);
  const [appInitialized, setAppInitialized] = useState(false);

  useEffect(() => {
    dispatch(getUserAuthData()).then(() => setAppInitialized(true));
  }, [dispatch]);

  useLayoutEffect(() => {
    if (isDarkMode) {
      document.body.className = 'bodyD';
    } else {
      document.body.className = 'body';
    }
  }, [isDarkMode]);

  return (
    <div className={`App ${isDarkMode ? 'AppD' : ''}`}>
      {appInitialized ? (
        isAuth ? (
          <div className='container'>
            <Menu />
            <main className='main'>
              <Suspense fallback={<Preloader />}>
                <Routes>
                  <Route path='/' element={<Navigate to={`/profile/${id}`} />}>
                    <Route path='login' element={<Outlet />} />
                    <Route path='profile' element={<Outlet />} />
                  </Route>
                  <Route path='/profile/:userId' element={<Profile />} />
                  <Route path='/profile/edit' element={<EditProfile />} />
                  <Route path='/users' element={<Users />} />
                  <Route path='/dialogs' element={<Dialogs />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Chat />
          </div>
        ) : (
          <div className='login'>
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path='*' element={<Navigate to='/login' />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </Suspense>
          </div>
        )
      ) : (
        <div className='preloader'>
          <Preloader />
        </div>
      )}
    </div>
  );
};

export default App;
