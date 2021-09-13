import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from '../store/reducers/authReducer';
import Login from './Login/Login';
import SideMenu from './SideMenu/SideMenu';
import ProfileContainer from './Profile/ProfileContainer';
import { Route, Switch } from 'react-router-dom';
import Users from './Users/Users';
import { getAuthState } from '../selectors/authSelectors';

const App: React.FC = props => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(getAuthState);

  useEffect(() => {
    dispatch(getUserAuthData());
  }, []);

  return (
    <div className='App'>
      {!isAuth ? (
        <Login />
      ) : (
        <>
          <div className='container'>
            <SideMenu />
            <main className='main'>
              <Switch>
                <Route
                  path='/profile/:userId'
                  component={() => <ProfileContainer />}
                />
                <Route path='/users' component={Users} />
              </Switch>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
