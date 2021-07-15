import React, { useEffect, useRef, useState } from 'react';
import styles from './ProfileHeader.module.css';
import FollowIcon from '../../../svg/FollowIcon';
import UnfollowIcon from '../../../svg/UnfollowIcon';
import MessageIcon from '../../../svg/MessageIcon';
import { NavLink } from 'react-router-dom';
import { IPhotos, IProfile, IProfileFormData } from '../../../types/profile';
import UserPhoto from './UserPhoto/UserPhoto';
import EditTextIcon from '../../../svg/EditTextIcon';
import EditIcon from '../../../svg/EditIcon';
import CheckMark from '../../../svg/CheckMark';
import Arrow from '../../../svg/Arrow';
import LookingForAJob from './LookingForAJob/LookingForAJob';
import Username from './Username/Username';

type Props = {
  profile: IProfile;
  userId: number | null;
  username: string;
  photos: IPhotos;
  isOwner: boolean;
  updateProfile: (
    profileFormData: IProfileFormData,
    userId: number | null
  ) => void;
  updatePhoto: (image: File, userId: number) => void;
};

const ProfileHeader: React.FC<Props> = ({
  profile,
  userId,
  username,
  photos,
  isOwner,
  updateProfile,
  updatePhoto,
}) => {
  const [arrowType, setArrowType] = useState<'down' | 'up'>('down');

  const onArrowClick = () => {
    setArrowType(type => {
      if (type === 'down') {
        return 'up';
      } else {
        return 'down';
      }
    });
  };

  return (
    <div className={styles.header}>
      <div className={styles.user}>
        <UserPhoto
          userId={userId}
          photos={photos}
          isOwner={isOwner}
          updatePhoto={updatePhoto}
        />
        <div className={styles.column}>
          <Username
            profile={profile}
            userId={userId}
            username={username}
            isOwner={isOwner}
            updateProfile={updateProfile}
          />
          <div className={styles.moreInfo}>
            <div className={styles.LFJ}>
              <div
                className={`${styles.isLFJ} ${isOwner && styles.isLFJCursor}`}
                onClick={() => {
                  if (isOwner) {
                    updateProfile(
                      { ...profile, lookingForAJob: !profile.lookingForAJob },
                      userId
                    );
                  }
                }}
              >
                {profile.lookingForAJob ? (
                  <CheckMark size='15px' type='resolve' />
                ) : (
                  <CheckMark size='15px' type='reject' />
                )}
              </div>
              <span>Looking for a job</span>
              <div className={styles.arrow} onClick={onArrowClick}>
                <Arrow size='10px' type={arrowType} />
              </div>
              {arrowType === 'up' && (
                <LookingForAJob
                  isOwner={isOwner}
                  profile={profile}
                  setArrowType={setArrowType}
                  updateProfile={updateProfile}
                  userId={userId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        {isOwner ? (
          <NavLink to={`/profile/edit`}>
            <div className={`${styles.editProfile} ${styles.button}`}>
              <EditIcon size='15px' />
              <button>Edit</button>
            </div>
          </NavLink>
        ) : (
          <div className={`${styles.follow} ${styles.button}`}>
            <FollowIcon size='20px' />
            <button>Follow</button>
          </div>
        )}

        <NavLink to={`/messages/${userId}`}>
          <div className={`${styles.message} ${styles.button}`}>
            <MessageIcon size='25px' fill='#000' />
            <button>Message</button>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileHeader;
