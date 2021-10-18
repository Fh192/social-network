import React, { useState } from 'react';
import CommentIcon from '../../../../svg/CommentIcon';
import DotsIcon from '../../../../svg/DotsIcon';
import LikeIcon from '../../../../svg/LikeIcon';
import SendIcon from '../../../../svg/SendIcon';
import { IComment, IPost } from '../../../../types/posts';
import Comment from '../Comment/Comment';
import styles from './Post.module.css';

interface Props {
  post: IPost;
  userId: number | null;
  likePost: (postId: number, userId: number | null) => void;
  deletePost: (postId: number) => void;
  addComment: (comment: IComment, postId: number) => void;
}

const Post: React.FC<Props> = ({
  post,
  userId,
  deletePost,
  likePost,
  addComment,
}) => {
  const [dotsOpen, setDotsOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  const { postId, addDate, author, text, imageSrc, comments, likes, whoLiked } =
    post;

  const postDate = addDate.split('T');
  const postDateYear = postDate[0].split('-').reverse().join('.');
  const postDateTime = new Date(addDate).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const onSendComment = () => {
    addComment(
      {
        commentId: comments.length,
        addDate: new Date(),
        author,
        text: newCommentText,
      },
      postId
    );
    setNewCommentText('');
  };

  return (
    <li className={styles.post}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.authorAvatar}>
            <img src={author.avatar} alt='avatar' />
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
        <div className={styles.dots}>
          <div className={styles.dotsIcon} onClick={() => setDotsOpen(e => !e)}>
            <DotsIcon size='20px' />
          </div>

          {dotsOpen && (
            <div
              className={styles.delete}
              onClick={() => {
                deletePost(postId);
                setDotsOpen(false);
              }}
            >
              <span>Delete post</span>
            </div>
          )}
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
        <div className={styles.like} onClick={() => likePost(postId, userId)}>
          <LikeIcon size='20px' liked={whoLiked.includes(userId || -0)} />
          {likes > 0 ? <span>{likes}</span> : <span>Like</span>}
        </div>
        <div className={styles.comment}>
          <CommentIcon size='20px' />
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
            <img src={author.avatar} alt='author avatar' />
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
            {newCommentText.length > 0 && (
              <button onClick={onSendComment}>
                <SendIcon size='20px' />
              </button>
            )}
          </div>
        </div>
        <ul className={styles.commentsList}>
          {comments.map(comment => (
            <Comment {...comment} key={comment.commentId} />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Post;
