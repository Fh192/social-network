import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideMenu.module.css';
import UsersIcon from '../../svg/UsersIcon';
import MessagesIcon from '../../svg/MessagesIcon';
import ProfileIcon from '../../svg/ProfileIcon';
import LogoutIcon from '../../svg/LogoutIcon';
import { connect } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/reducers/authReducer';

interface MapStateProps {
  username: string;
  userId: number | null;
}

interface MapDispatchProps {
  logout: () => void;
}

type Props = MapStateProps & MapDispatchProps;

const SideMenu: React.FC<Props> = ({ username, userId, logout }) => {
  return (
    <nav className={styles.sideMenu}>
      <ul className={styles.list}>
        <NavLink className={styles.link} to={`/profile/${userId}`}>
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
      <div className={styles.bottom}>
        <NavLink to={`/profile/${userId}`}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <ProfileIcon size='40px' />
            </div>
            <div className={styles.username}>{username}</div>
          </div>
        </NavLink>

        <div className={styles.logout} onClick={logout}>
          <LogoutIcon size='15px' />
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  username: state.auth.login,
  userId: state.auth.id,
  //userAvatar
});

export default connect(mapStateToProps, { logout })(SideMenu);
