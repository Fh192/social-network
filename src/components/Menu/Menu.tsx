import React, { BaseSyntheticEvent, useLayoutEffect, useState } from 'react';
import styles from './Menu.module.css';
import UsersIcon from '../../svg/UsersIcon';
import MessageIcon from '../../svg/MessageIcon';
import ProfileIcon from '../../svg/ProfileIcon';
import LogoutIcon from '../../svg/LogoutIcon';
import { useDispatch } from '../../hooks/useDispatch';
import { logout } from '../../store/reducers/authReducer';
import photoPlaceholder from '../../assets/userPhoto.png';
import photoPlaceholderD from '../../assets/userPhotoDark.png';
import { useSelector } from '../../hooks/useSelector';
import { getUserPhoto } from '../../common/getUserPhoto';
import { useDarkMode } from 'usehooks-ts';
import classNames from 'classnames/bind';
import { ToggleTheme } from '../TogleTheme/ToggleTheme';
import { Link } from 'react-router-dom';

export const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);

  const { id: userId, login: username } = useSelector(s => s.auth);
  const { isDarkMode } = useDarkMode(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  const onLogout = () => {
    dispatch(logout());
  };

  useLayoutEffect(() => {
    const listener = () => {
      if (window.innerWidth <= 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  if (isMobile) {
    return (
      <nav className={cx({ mMenu: true, mMenuD: isDarkMode })}>
        <div className={styles.mToggleTheme}>
          <ToggleTheme />
        </div>
        <ul className={styles.mList}>
          <li className={styles.mItem}>
            <Link className={styles.link} to='/users?page=1'>
              <UsersIcon size='25px' />
            </Link>
          </li>
          <li className={styles.mItem}>
            <div className={styles.avatar}>
              <Link to={`/profile/${userId}`}>
                <img
                  src={getUserPhoto(userId as number)}
                  onError={(e: BaseSyntheticEvent) => {
                    e.target.onerror = null;
                    e.target.src = isDarkMode
                      ? photoPlaceholderD
                      : photoPlaceholder;
                  }}
                  alt={'user'}
                />
              </Link>
            </div>
          </li>
          <li className={styles.mItem}>
            <Link className={styles.link} to='/dialogs'>
              <MessageIcon size='25px' fill='#99A2AD' />
            </Link>
          </li>
        </ul>
        <div className={styles.mLogout} onClick={onLogout}>
          <LogoutIcon size='15px' />
        </div>
      </nav>
    );
  } else {
    return (
      <nav className={cx({ menu: true, menuD: isDarkMode })}>
        <div className={styles.toggleTheme}>
          <ToggleTheme />
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link} to={`/profile/${userId}`}>
              <ProfileIcon size='25px' />
              <span>Profile</span>
            </Link>
          </li>

          <li className={styles.item}>
            <Link className={styles.link} to='/users?page=1'>
              <UsersIcon size='25px' />
              <span>Users</span>
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} to='/dialogs'>
              <MessageIcon size='25px' fill='#99A2AD' />
              <span>Dialogs</span>
            </Link>
          </li>
        </ul>
        <div className={styles.bottom}>
          <Link to={`/profile/${userId}`}>
            <div className={styles.user}>
              <div className={styles.avatar}>
                <img
                  src={getUserPhoto(userId as number)}
                  onError={(e: BaseSyntheticEvent) => {
                    e.target.onerror = null;
                    e.target.src = isDarkMode
                      ? photoPlaceholderD
                      : photoPlaceholder;
                  }}
                  alt={'user'}
                />
              </div>
              <div className={styles.username}>{username}</div>
            </div>
          </Link>

          <div className={styles.logout} onClick={onLogout}>
            <LogoutIcon size='15px' />
          </div>
        </div>
      </nav>
    );
  }
};
