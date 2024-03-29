import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserPhoto } from '../../../../hooks/useUserPhoto';
import { IComment } from '../../../../types/posts';
import styles from './Comment.module.css';
interface Props extends IComment {
  isLast: boolean;
}

const Comment: React.FC<Props> = ({
  addDate,
  author,
  isLast,
  text,
  userId,
}) => {
  const cx = classNames.bind(styles);
  const { photo, photoErrorHandler } = useUserPhoto(author.photo);

  const time = new Date(addDate).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div
      className={cx({
        comment: true,
        commentBorder: isLast,
      })}
    >
      <div className={styles.inner}>
        <div className={styles.authorAvatar}>
          <Link to={`/profile/${userId}`}>
            <img src={photo} alt="" onError={photoErrorHandler} />
          </Link>
        </div>
        <div className={styles.col}>
          <div className={styles.username}>
            <Link to={`/profile/${userId}`}>
              <span>{author.username}</span>
            </Link>
          </div>
          <div className={styles.text}>
            <p>{text}</p>
          </div>
        </div>
      </div>
      <div className={styles.addDate}>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default Comment;
