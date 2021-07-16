import React from 'react';
import styles from './Profile.module.css';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import { ProfileProps } from './ProfileContainer';
import About from './About/About';

const Profile: React.FC<ProfileProps> = ({
  profile,
  userId,
  username,
  photos,
  isOwner,
  email,
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
      <div className={styles.main}>
        <About
          aboutMe={profile.aboutMe}
          email={email}
          contacts={profile.contacts}
        />
      </div>
    </div>
  );
};

export default Profile;
