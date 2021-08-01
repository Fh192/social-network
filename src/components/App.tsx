import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { getUserAuthData } from '../store/reducers/authReducer';
import Login from './Login/Login';
import SideMenu from './SideMenu/SideMenu';
import ProfileContainer from './Profile/ProfileContainer';
import { Route, Switch } from 'react-router-dom';
import Users from './Users/Users';

interface Props {
  isAuth: boolean;
  getUserAuthData: () => void;
}

const App: React.FC<Props> = ({ isAuth, getUserAuthData }) => {
  useEffect(() => getUserAuthData(), []);

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
                <Route path='/users' component={() => <Users />} />
              </Switch>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { getUserAuthData })(App);
