import React from 'react';
import { useDispatch } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import classNames from 'classnames/bind';
import styles from './FollowButton.module.css';
import { toggleFollow as usersToggleFollow } from '../../store/reducers/usersReducer';
import { toggleFollow as profileToggleFollow } from '../../store/reducers/profileReducer';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {
  userId: number;
  followed: boolean;
  inFollowProcess: boolean;
}

const FollowButton: React.FC<Props> = ({
  userId,
  followed,
  inFollowProcess,
  ...props
}) => {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const pathname = props.location.pathname;

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
        followed: followed,
        disabled: inFollowProcess,
        big: pathname.includes('/profile'),
      })}
    >
      <button disabled={inFollowProcess} onClick={onToggleFollow}>
        {inFollowProcess ? (
          <Preloader size='15' color={followed ? '#000' : '#fff'} />
        ) : followed ? (
          'Unfollow'
        ) : (
          'Follow'
        )}
      </button>
    </div>
  );
};

export default withRouter(FollowButton);
