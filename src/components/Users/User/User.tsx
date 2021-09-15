import React from 'react';
import { IUser } from '../../../types/users';
import styles from './User.module.css';
import photoPlaceholder from '../../../images/userPhoto.png';
import {  useSelector } from 'react-redux';
import { selectUsersState } from '../../../selectors/usersSelector';
import { NavLink } from 'react-router-dom';
import FollowButton from '../../FollowButton/FollowButton';

const User: React.FC<IUser> = ({ name, photos, followed, id }) => {
  const { inFollowProgress } = useSelector(selectUsersState);
  const photo = photos.large;

  return (
    <li className={styles.user}>
      <div className={styles.photo}>
        <NavLink to={`/profile/${id}`}>
          <img src={photo || photoPlaceholder} alt='User' />
        </NavLink>
      </div>
      <div className={styles.col}>
        <div className={styles.name}>
          <NavLink to={`/profile/${id}`}>
            <span title={name}>{name}</span>
          </NavLink>
        </div>
        <FollowButton
          followed={followed}
          userId={id}
          inFollowProcess={inFollowProgress.some(i => i === id)}
        />
      </div>
    </li>
  );
};

export default User;
