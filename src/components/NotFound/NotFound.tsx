import React from 'react';
import styles from './NotFound.module.css';
import notFoundIcon from '../../assets/404.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import { useDarkMode } from 'usehooks-ts';
import classNames from 'classnames/bind';
import { ToggleTheme } from '../TogleTheme/ToggleTheme';

const NotFound: React.FC = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const { id: userId } = useSelector(s => s.auth);
  const { isDarkMode } = useDarkMode();

  return (
    <div className={cx({ notFound: true, notFoundD: isDarkMode })}>
      <div className={cx(['toggleTheme'])}>
        <ToggleTheme />
      </div>
      <div className={styles.image}>
        <img src={notFoundIcon} alt='404' />
      </div>
      <div className={styles.text}>
        <span>OOPS!</span>
        <span>PAGE NOT FOUND</span>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => navigate(`/profile/${userId}`)}>GO HOME</button>
        <button onClick={() => navigate(-1)}>GO BACK</button>
      </div>
    </div>
  );
};

export default NotFound;
