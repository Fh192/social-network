import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { getUserAuthData } from '../store/reducers/authReducer';
import Login from './Login/Login';
import SideMenu from './SideMenu/SideMenu';
import Profile from './Profile/Profile';
import { Route, Switch } from 'react-router-dom';

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
            <main
              style={{ background: 'rgba(0,0,0,0.5)', padding: '30px' }}
              id='main'
            >
              <Switch>
                {/* @ts-ignore */}
                <Route path='/profile/:userId' component={() => <Profile />} />
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
