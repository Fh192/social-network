import React, { useState } from 'react';
import styles from './ProfileHeader.module.css';
import { NavLink } from 'react-router-dom';
import { IProfile, IProfileForUpdate } from '../../../types/profile';
import UserPhoto from './UserPhoto/UserPhoto';
import EditIcon from '../../../svg/EditIcon';
import CheckMark from '../../../svg/CheckMark';
import Arrow, { ArrowType } from '../../../svg/Arrow';
import LookingForAJob from './LookingForAJob/LookingForAJob';
import Username from './Username/Username';
import { IPhotos } from '../../../types/common';
import FollowButton from '../../FollowButton/FollowButton';

type Props = {
  profile: IProfile;
  userId: number | null;
  username: string;
  photos: IPhotos;
  isOwner: boolean;
  updateProfile: (
    profileFormData: IProfileForUpdate,
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
  const [arrowType, setArrowType] = useState<ArrowType>('down');
  const followed = profile.followed;
  const inFollowProcess = profile.inFollowProcess

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
          <FollowButton
            userId={userId as number}
            followed={followed}
            inFollowProcess={inFollowProcess}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
