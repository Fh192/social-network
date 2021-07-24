import React, { useRef, useState } from 'react';
import EditTextIcon from '../../../../svg/EditTextIcon';
import { IProfile, IProfileForUpdate } from '../../../../types/profile';
import styles from './LookingForAJob.module.css';

interface Props {
  isOwner: boolean;
  userId: number | null;
  profile: IProfile;
  updateProfile: (
    profileFormData: IProfileForUpdate,
    userId: number | null
  ) => void;
  setArrowType: React.Dispatch<React.SetStateAction<'down' | 'up'>>;
}

const LookingForAJob: React.FC<Props> = ({
  isOwner,
  userId,
  profile,
  updateProfile,
  setArrowType,
}) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [textareaValue, setTextareaValue] = useState('');
  const [LFJEditMode, setLFJEditMode] = useState(false);

  const onChangeHandler = function (e: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;

    if (textRef.current) {
      textRef.current.style.height = '30px';
      textRef.current.style.height = `${target.scrollHeight}px`;

      setTextareaValue(e.target.value);
    }
  };

  const onSave = () => {
    setLFJEditMode(false);
    updateProfile(
      {
        ...profile,
        lookingForAJobDescription: textareaValue,
      },
      userId
    );
  };

  const onClose = () => {
    setTextareaValue('');
    setArrowType('down');
    setLFJEditMode(false);
  };

  return (
    <div className={styles.popup} onBlurCapture={() => setLFJEditMode(false)}>
      <div className={styles.LFJDesc}>
        {LFJEditMode ? (
          <div className={styles.editMode}>
            <textarea
              placeholder='Write some thing...'
              onChange={onChangeHandler}
              ref={textRef}
              value={textareaValue}
              autoFocus
            />
            <div className={styles.buttons}>
              <button className={styles.saveButton} onClick={onSave}>
                Save
              </button>
              <button className={styles.closeButton} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <span>
              {profile.lookingForAJobDescription
                ? profile.lookingForAJobDescription
                : 'No description'}
            </span>
            {isOwner && (
              <div
                className={styles.editLFJDesc}
                onClick={() => setLFJEditMode(true)}
              >
                <EditTextIcon size='20px' />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LookingForAJob;
