import React from 'react';
import { IComment } from '../../../../types/posts';
import styles from './Comment.module.css';
import classNames from 'classnames/bind';

const Comment: React.FC<IComment> = ({ addDate, author, commentId, text }) => {
  const postDateTime = new Date(addDate).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const cx = classNames.bind(styles);

  return (
    <div
      className={cx({
        comment: true,
        commentBorder: commentId !== 0,
      })}
    >
      <div className={styles.inner}>
        <div className={styles.authorAvatar}>
          <img src={author.avatar} alt='' />
        </div>
        <div className={styles.col}>
          <div className={styles.username}>
            <span>{author.username}</span>
          </div>
          <div className={styles.text}>
            <p>{text}</p>
          </div>
        </div>
      </div>

      <div className={styles.addDate}>
        <span>{postDateTime}</span>
      </div>
    </div>
  );
};

export default Comment;
