import React from 'react';
import { IProfile, IProfileForUpdate } from '../../../types/profile';
import styles from './EditProfile.module.css';
import EditProfileForm from './EditProfileForm';

interface Props {
  profile: IProfile;
  updateProfile: (
    profileFormData: IProfileForUpdate,
    userId: number | null
  ) => void;
}

const EditProfile: React.FC<Props> = ({ ...props }) => {
  return (
    <div className={styles.editProfile}>
      <EditProfileForm {...props} />
    </div>
  );
};

export default EditProfile;
