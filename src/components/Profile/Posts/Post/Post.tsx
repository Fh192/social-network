import React, { BaseSyntheticEvent, useState } from 'react';
import { useDispatch } from '../../../../hooks/useDispatch';
import { useSelector } from '../../../../hooks/useSelector';
import CommentIcon from '../../../../svg/CommentIcon';
import LikeIcon from '../../../../svg/LikeIcon';
import SendIcon from '../../../../svg/SendIcon';
import { IPost } from '../../../../types/posts';
import Comment from '../Comment/Comment';
import styles from './Post.module.css';
import photoPlaceholder from '../../../../assets/userPhoto.png';
import photoPlaceholderD from '../../../../assets/userPhotoDark.png';
import { createComment } from '../../../../store/reducers/postsReducer';
import { deletePost, likePost } from '../../../../store/actions/posts';
import { CrossIcon } from '../../../../svg/CrossIcon';
import { useDarkMode } from 'usehooks-ts';
import classNames from 'classnames/bind';

interface Props {
  post: IPost;
}

const Post: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);

  const { isDarkMode } = useDarkMode();
  const [newCommentText, setNewCommentText] = useState('');
  const { id: userId } = useSelector(s => s.auth);

  const { id, addDate, author, text, imageSrc, comments, likes } = post;

  const postDateYear = new Date(addDate).toLocaleString('ru', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  const postDateTime = new Date(addDate).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const onSendComment = () => {
    dispatch(createComment(newCommentText, id));
    setNewCommentText('');
  };

  const onLikePost = () => {
    dispatch(likePost(id, userId as number));
  };

  return (
    <li className={cx({ post: true, postD: isDarkMode })}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.authorAvatar}>
            <img
              src={author.photo || photoPlaceholder}
              onError={(e: BaseSyntheticEvent) => {
                e.target.onerror = null;
                e.target.src = isDarkMode
                  ? photoPlaceholderD
                  : photoPlaceholder;
              }}
              alt='avatar'
            />
          </div>
          <div className={styles.col}>
            <div className={styles.username}>
              <span>{author.username}</span>
            </div>
            <div className={styles.postDate}>
              <span>{`${postDateYear} at ${postDateTime}`}</span>
            </div>
          </div>
        </div>
        <div className={styles.delete} onClick={() => dispatch(deletePost(id))}>
          <CrossIcon size='20px' />
        </div>
      </div>
      <div className={styles.postText}>
        <p>{text}</p>
      </div>
      {imageSrc && (
        <div className={styles.image}>
          <img src={imageSrc} alt='post' />
        </div>
      )}
      <div className={styles.rate}>
        <div className={styles.like} onClick={onLikePost}>
          <LikeIcon
            size='20px'
            liked={likes.includes(userId as number)}
            color={isDarkMode ? '#99A2AD' : ''}
          />
          {!!likes.length ? <span>{likes.length}</span> : <span>Like</span>}
        </div>
        <div className={styles.comment}>
          <CommentIcon size='20px' color={isDarkMode ? '#99A2AD' : ''} />
          {comments.length > 0 ? (
            <span>{comments.length}</span>
          ) : (
            <span>Comment</span>
          )}
        </div>
      </div>
      <div className={styles.comments}>
        <div className={styles.writeComment}>
          <div className={styles.commentAuthorAvatar}>
            <img
              src={author.photo}
              onError={(e: BaseSyntheticEvent) => {
                e.target.onerror = null;
                e.target.src = isDarkMode
                  ? photoPlaceholderD
                  : photoPlaceholder;
              }}
              alt='author avatar'
            />
          </div>
          <div className={styles.writeCommentInput}>
            <input
              value={newCommentText}
              onChange={e => setNewCommentText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && newCommentText.length > 0) {
                  onSendComment();
                }
              }}
              type='text'
              placeholder='Write a comment...'
            />
            {!!newCommentText.length && (
              <button onClick={onSendComment}>
                <SendIcon size='20px' color={isDarkMode ? '#99A2AD' : ''} />
              </button>
            )}
          </div>
        </div>
        {!!comments.length && (
          <ul className={styles.commentsList}>
            {comments.map(comment => (
              <Comment
                {...comment}
                isLast={comments.lastIndexOf(comment) !== comments.length - 1}
                key={comment.id}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default Post;
