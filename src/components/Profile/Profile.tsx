import React from 'react';
import styles from './Profile.module.css';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import { ProfileProps } from './ProfileContainer';
import About from './About/About';
import Posts from './Posts/Posts';
import { Route } from 'react-router-dom';
import EditProfile from './EditProfile/EditProfile';

const Profile: React.FC<ProfileProps> = ({
  profile,
  isOwner,
  posts,
  updateProfile,
  updatePhoto,
  ...props
}) => {
  const {
    userId,
    fullName: username,
    photos,
    aboutMe,
    contacts,
  } = profile;

  return (
    <div className={styles.profile}>
      <ProfileHeader
        profile={profile}
        userId={userId}
        username={username}
        isOwner={isOwner}
        photos={photos}
        updateProfile={updateProfile}
        updatePhoto={updatePhoto}
      />

      <div className={styles.main}>
        <Route
          path='/profile/edit'
          component={() => (
            <EditProfile profile={profile} updateProfile={updateProfile} />
          )}
        />
        {userId && (
          <Route
            path={`/profile/${userId}`}
            component={() => (
              <>
                <About
                  aboutMe={aboutMe}
                  isOwner={isOwner}
                  contacts={contacts}
                  posts={posts}
                />
                <Posts
                  username={username}
                  userAvatar={photos.large}
                  isOwner={isOwner}
                />
              </>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
