import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideMenu.module.css';
import UsersIcon from '../../svg/UsersIcon';
import MessagesIcon from '../../svg/MessagesIcon';
import ProfileIcon from '../../svg/ProfileIcon';

const SideMenu: React.FC = () => {
  return (
    <nav className={styles.sideMenu}>
      <ul className={styles.list}>
        <NavLink className={styles.link} to='/profile/:userId'>
          <li className={styles.item}>
            <ProfileIcon size='25px' />
            <span>Profile</span>
          </li>
        </NavLink>
        <NavLink className={styles.link} to='/users'>
          <li className={styles.item}>
            <UsersIcon size='25px' />
            <span>Users</span>
          </li>
        </NavLink>
        <NavLink className={styles.link} to='/messages'>
          <li className={styles.item}>
            <MessagesIcon size='25px' />
            <span>Messages</span>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default SideMenu;
