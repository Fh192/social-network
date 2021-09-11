import React from 'react';
import { IUser } from '../../../types/users';
import styles from './User.module.css';
import photoPlaceholder from '../../../images/userPhoto.png';
import { toggleFollow } from '../../../store/reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsersState } from '../../../selectors/usersSelector';
import classNames from 'classnames/bind';
import Preloader from '../../Preloader/Preloader';

const User: React.FC<IUser> = ({ name, photos, followed, id }) => {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();

  const { inFollowProgress } = useSelector(selectUsersState);
  const photo = photos.large;
  const isBtnDisabled = inFollowProgress.some(i => i === id);

  const onToggleFollow = () => {
    dispatch(toggleFollow(id));
  };

  return (
    <li className={styles.user}>
      <div className={styles.photo}>
        <img src={photo || photoPlaceholder} alt='User photo' />
      </div>
      <div className={styles.col}>
        <div className={styles.name}>
          <span>{name}</span>
        </div>
        <div
          className={cx({
            followBtn: true,
            followed: followed,
            disabled: isBtnDisabled,
          })}
        >
          <button disabled={isBtnDisabled} onClick={onToggleFollow}>
            {isBtnDisabled ? (
              <Preloader size='15' color={followed ? '#000' : '#fff'} />
            ) : followed ? (
              'Unfollow'
            ) : (
              'Follow'
            )}
          </button>
        </div>
      </div>
    </li>
  );
};

export default User;
