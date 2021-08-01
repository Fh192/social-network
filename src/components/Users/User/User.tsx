import React from 'react';
import { IUser } from '../../../types/users';
import styles from './User.module.css';
import userPhotoPlaceholder from '../../../images/userPhoto.png';
import { NavLink } from 'react-router-dom';

interface Props extends IUser {
  toggleFollow: (userId: number) => Promise<void>;
}

const User: React.FC<Props> = ({
  followed,
  id,
  name,
  photos,
  toggleFollow,
}) => {
  const photo = photos.large;

  return (
    <li className={styles.user}>
      <NavLink to={`profile/${id}`}>
        <div className={styles.inner}>
          <div className={styles.userPhoto}>
            <img src={photo || userPhotoPlaceholder} alt='user photo' />
          </div>
          <div className={styles.username}>
            <span>{name}</span>
          </div>
        </div>
      </NavLink>
      <div className={styles.follow} onClick={() => toggleFollow(id)}>
        {followed ? <button>unfollow</button> : <button>follow</button>}
      </div>
    </li>
  );
};

export default User;
