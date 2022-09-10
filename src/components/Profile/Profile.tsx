import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';
import { getUserProfile } from '../../store/reducers/profileReducer';
import Preloader from '../Preloader/Preloader';
import { About } from './About/About';
import { Posts } from './Posts/Posts';
import styles from './Profile.module.css';
import ProfileHeader from './ProfileHeader/ProfileHeader';

export const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { userId: profileId } = useSelector(s => s.profile);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!userId || fetching) return undefined;

    if (+userId !== profileId) {
      setFetching(true);
      dispatch(getUserProfile(+userId)).then(() => setFetching(false));
    }
  }, [dispatch, userId, profileId, fetching]);

  if (fetching) return <Preloader />;

  return (
    <div className={styles.profile}>
      <ProfileHeader />
      <div className={styles.main}>
        <About />
        <Posts />
      </div>
    </div>
  );
};
