import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from 'usehooks-ts';
import { useSelector } from '../../../hooks/useSelector';
import { selectIsOwner } from '../../../store/selectors/profileSelectors';
import FollowButton from '../../FollowButton/FollowButton';
import styles from './ProfileHeader.module.css';
import { UserPhoto } from './UserPhoto/UserPhoto';

const ProfileHeader: React.FC = () => {
  const cx = classNames.bind(styles);

  const profile = useSelector(s => s.profile);
  const isOwner = useSelector(selectIsOwner);
  const { followed, inFollowProcess, userId, fullName: username } = profile;
  const { isDarkMode } = useDarkMode();

  return (
    <div className={cx({ header: true, headerD: isDarkMode })}>
      <div className={styles.user}>
        <UserPhoto />
        <div className={styles.username}>
          <span>{username}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        {isOwner ? (
          <div className={cx(['editProfile', 'button'])}>
            <Link to={`/profile/edit`}>
              <button>Edit</button>
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.button}>
              <FollowButton
                userId={userId as number}
                followed={followed}
                inFollowProcess={inFollowProcess}
                padding="10px 30px"
                fontSize="16px"
              />
            </div>
            <div className={cx(['button', 'message'])}>
              <Link to={`/dialogs/${userId}/messages`}>
                <button>Message</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
