import classNames from 'classnames/bind';
import React from 'react';
import { useLocation } from 'react-router';
import { useDarkMode } from 'usehooks-ts';
import { useDispatch } from '../../hooks/useDispatch';
import { toggleFollow as profileToggleFollow } from '../../store/reducers/profileReducer';
import { toggleFollow as usersToggleFollow } from '../../store/reducers/usersSlice';
import Preloader from '../Preloader/Preloader';
import styles from './FollowButton.module.css';

interface Props {
  userId: number;
  followed: boolean;
  inFollowProcess: boolean;
  padding?: string;
  fontSize?: string;
}

const FollowButton: React.FC<Props> = ({
  userId,
  followed,
  inFollowProcess,
  padding,
  fontSize,
}) => {
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);
  const { isDarkMode } = useDarkMode();
  const { pathname } = useLocation();

  const onToggleFollow = () => {
    if (pathname.includes('/users')) {
      dispatch(usersToggleFollow(userId));
    } else if (pathname.includes('/profile')) {
      dispatch(profileToggleFollow(userId));
    }
  };

  return (
    <div
      className={cx({
        followBtn: true,
        followBtnD: isDarkMode,
      })}
    >
      <button
        className={cx({ followed: followed, disabled: inFollowProcess })}
        disabled={inFollowProcess}
        onClick={onToggleFollow}
        style={{ padding, fontSize }}
      >
        {inFollowProcess ? (
          <Preloader size="15" color={followed ? '#000' : '#fff'} />
        ) : followed ? (
          'Unfollow'
        ) : (
          'Follow'
        )}
      </button>
    </div>
  );
};

export default FollowButton;
