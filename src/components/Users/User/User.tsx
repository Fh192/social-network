import React, { useState } from 'react';
import { IUser } from '../../../types/users';
import styles from './User.module.css';
import photoPlaceholder from '../../../assets/userPhoto.png';
import photoPlaceholderD from '../../../assets/userPhotoDark.png';
import Preloader from '../../Preloader/Preloader';
import FollowButton from '../../FollowButton/FollowButton';
import { useSelector } from '../../../hooks/useSelector';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDarkMode } from 'usehooks-ts';

export const User: React.FC<IUser> = ({
  photos: { large: photo },
  followed,
  id: userId,
  name,
}) => {
  const cx = classNames.bind(styles);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const { isDarkMode } = useDarkMode();
  const inFollowProcess = useSelector(s =>
    s.users.inFollowProgress.some(id => id === userId)
  );

  return (
    <li className={cx({ user: true, userD: isDarkMode })}>
      <Link className={styles.link} to={`/profile/${userId}`} />
      <div className={styles.photo}>
        <Link to={`/profile/${userId}`}>
          <img
            src={photo || (isDarkMode ? photoPlaceholderD : photoPlaceholder)}
            onLoad={() => setPhotoLoaded(true)}
            loading='lazy'
            alt='user'
          />
        </Link>
        {!photoLoaded && (
          <div className={styles.photoPreloader}>
            <Preloader />
          </div>
        )}
      </div>
      <div className={styles.col}>
        <div className={styles.username}>
          <span>{name}</span>
        </div>
        <div className={styles.followBtn}>
          <FollowButton
            inFollowProcess={inFollowProcess}
            followed={followed}
            userId={userId}
          />
        </div>
      </div>
    </li>
  );
};
