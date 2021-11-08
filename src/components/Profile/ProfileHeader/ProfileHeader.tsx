import React from 'react';
import styles from './ProfileHeader.module.css';
import { Link } from 'react-router-dom';
import { UserPhoto } from './UserPhoto/UserPhoto';
import FollowButton from '../../FollowButton/FollowButton';
import { useSelector } from '../../../hooks/useSelector';
import { selectIsOwner } from '../../../selectors/profileSelectors';
import classNames from 'classnames/bind';
import { useDarkMode } from 'usehooks-ts';

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
                padding='10px 30px'
                fontSize='16px'
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
