import React, { useEffect, useState } from 'react';
import { IMessage } from '../../../types/chat';
import styles from './Message.module.css';
import photoPlaceholder from '../../../assets/userPhoto.png';
import photoPlaceholderD from '../../../assets/userPhotoDark.png';
import { Link } from 'react-router-dom';
import { useDarkMode } from 'usehooks-ts';

interface Props extends IMessage {
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Message: React.FC<Props> = ({
  message,
  userId,
  userName,
  setIsChatOpen,
  ...props
}) => {
  const [photo, setPhoto] = useState(props.photo || photoPlaceholder);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (!props.photo) {
      if (isDarkMode) {
        setPhoto(photoPlaceholderD);
      } else {
        setPhoto(photoPlaceholder);
      }
    }
  }, [props.photo, isDarkMode]);

  return (
    <div className={styles.message}>
      <Link to={`/profile/${userId}`} onClick={() => setIsChatOpen(false)}>
        <div className={styles.photo}>
          <img src={photo} alt='user' />
        </div>
      </Link>
      <div className={styles.col}>
        <div className={styles.username}>
          <Link to={`/profile/${userId}`} onClick={() => setIsChatOpen(false)}>
            <span>{userName}</span>
          </Link>
        </div>
        <div className={styles.text}>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
