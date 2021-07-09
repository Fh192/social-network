import React from 'react';
import styles from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <div className={styles.side}>
        <h1>...</h1>
      </div>
      <div className={styles.loginForm}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
