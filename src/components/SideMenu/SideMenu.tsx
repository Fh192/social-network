import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideMenu.module.css';
import UsersIcon from '../../svg/UsersIcon';
import MessageIcon from '../../svg/MessageIcon';
import ProfileIcon from '../../svg/ProfileIcon';
import LogoutIcon from '../../svg/LogoutIcon';
import { connect } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/reducers/authReducer';
import profileAPI from '../../api/profileAPI';
import photoPlaceholder from '../../images/userPhoto.png';

interface MapStateProps {
  username: string;
  userId: number | null;
}

interface MapDispatchProps {
  logout: () => void;
}

type Props = MapStateProps & MapDispatchProps;

const SideMenu: React.FC<Props> = ({ username, userId, logout }) => {
  const [photo, setPhoto] = useState(photoPlaceholder);

  useEffect(() => {
    const fetchPhoto = async () => {
      const data = await profileAPI.getUserProfile(userId);
      setPhoto(data.photos.large);
    };

    fetchPhoto();
  }, []);

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
            <MessageIcon size='25px' fill='#99A2AD' />
            <span>Messages</span>
          </li>
        </NavLink>
      </ul>
      <div className={styles.bottom}>
        <NavLink to={`/profile/${userId}`}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <img src={photo} alt={'user'} />
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
});

export default connect(mapStateToProps, { logout })(SideMenu);
