import React, { useEffect, useState } from 'react';
import EditTextIcon from '../../../../svg/EditTextIcon';
import { IProfile, IProfileFormData } from '../../../../types/profile';
import styles from './Username.module.css';

interface Props {
  profile: IProfile;
  userId: number | null;
  username: string;
  isOwner: boolean;
  updateProfile: (
    profileFormData: IProfileFormData,
    userId: number | null
  ) => void;
}

const Username: React.FC<Props> = ({
  profile,
  username,
  userId,
  isOwner,
  updateProfile,
}) => {
  const [usernameEditMode, setUsernameEditMode] = useState(false);
  const [hoverUsername, setHoverUsername] = useState(false);

  const [newUsername, setNewUsername] = useState(username);

  useEffect(() => setNewUsername(username), [username]);

  function onUsernameUpdate(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      updateProfile({ ...profile, fullName: newUsername }, userId);
      setUsernameEditMode(false);
    }
  }
  return (
    <div
      className={`${styles.username} ${isOwner && styles.usernameCursor}`}
      onMouseEnter={() => isOwner && setHoverUsername(true)}
      onMouseLeave={() => isOwner && setHoverUsername(false)}
      onClick={() => {
        isOwner && setUsernameEditMode(true);
      }}
    >
      {usernameEditMode ? (
        <>
          <input
            className={styles.usernameEditInput}
            type='text'
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            onKeyDown={e => {
              onUsernameUpdate(e);
            }}
            autoFocus
            placeholder='username'
          />
        </>
      ) : (
        <>
          <span>{username}</span>
          {hoverUsername && <EditTextIcon size='15px' />}
        </>
      )}
    </div>
  );
};

export default Username;
