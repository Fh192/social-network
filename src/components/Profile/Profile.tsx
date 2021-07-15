import React from 'react';
import styles from './Profile.module.css';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import { ProfileProps } from './ProfileContainer';

const Profile: React.FC<ProfileProps> = ({
  profile,
  userId,
  username,
  photos,
  isOwner,
  updateProfile,
  updatePhoto,
  ...props
}) => {
  return (
    <div className={styles.profile}>
      <ProfileHeader
        isOwner={isOwner}
        userId={userId}
        username={username}
        photos={photos}
        profile={profile}
        updateProfile={updateProfile}
        updatePhoto={updatePhoto}
      />
    </div>
  );
};

export default Profile;
