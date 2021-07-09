import React, { useEffect } from 'react';
import './App.css';
import Login from './Login/Login';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { getUserAuthData } from '../store/reducers/authReducer';

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
          <div className='container'></div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { getUserAuthData })(App);
