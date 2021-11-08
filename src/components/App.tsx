import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import './App.css';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
import { getUserAuthData } from '../store/reducers/authReducer';
import { Menu } from './Menu/Menu';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { getAuthState } from '../selectors/authSelectors';
import Preloader from './Preloader/Preloader';
import { Profile } from './Profile/Profile';
import { useDarkMode } from 'usehooks-ts';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, id } = useSelector(getAuthState);
  const { isDarkMode } = useDarkMode(false);
  const [appInitialized, setAppInitialized] = useState(false);

  const NotFound = useMemo(
    () => React.lazy(() => import('./NotFound/NotFound')),
    []
  );
  const Login = useMemo(() => React.lazy(() => import('./Login/Login')), []);
  const Users = useMemo(() => React.lazy(() => import('./Users/Users')), []);
  const Dialogs = useMemo(() => {
    return React.lazy(() => import('./Dialogs/Dialogs'));
  }, []);
  const EditProfile = useMemo(() => {
    return React.lazy(() => import('./Profile/EditProfile/EditProfile'));
  }, []);

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
          </div>
        ) : (
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path='*' element={<Navigate to='/login' />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Suspense>
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
