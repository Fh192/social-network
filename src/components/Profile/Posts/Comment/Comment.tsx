import React, { BaseSyntheticEvent } from 'react';
import { IComment } from '../../../../types/posts';
import styles from './Comment.module.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import photoPlaceholderD from '../../../../assets/userPhotoDark.png';
import photoPlaceholder from '../../../../assets/userPhoto.png';
import { useDarkMode } from 'usehooks-ts';
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
  const { isDarkMode } = useDarkMode();

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
            <img
              src={author.photo}
              onError={(e: BaseSyntheticEvent) => {
                e.target.onerror = null;
                e.target.src = isDarkMode
                  ? photoPlaceholderD
                  : photoPlaceholder;
              }}
              alt=''
            />
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
