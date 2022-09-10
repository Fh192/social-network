import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from 'usehooks-ts';
import photoPlaceholder from '../../../assets/userPhoto.png';
import photoPlaceholderD from '../../../assets/userPhotoDark.png';
import { useSelector } from '../../../hooks/useSelector';
import { IUser } from '../../../types/users';
import FollowButton from '../../FollowButton/FollowButton';
import Preloader from '../../Preloader/Preloader';
import styles from './User.module.css';

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
            loading="lazy"
            alt="user"
            onLoad={() => setPhotoLoaded(true)}
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
