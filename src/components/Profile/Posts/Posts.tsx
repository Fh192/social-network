import React, { BaseSyntheticEvent, useState } from 'react';
import CreatePost from './CreatePost/CreatePost';
import styles from './Posts.module.css';
import Post from './Post/Post';
import NoDataIcon from '../../../svg/NoDataIcon';
import { useSelector } from '../../../hooks/useSelector';
import { selectIsOwner } from '../../../selectors/profileSelectors';
import { getUserPhoto } from '../../../common/getUserPhoto';
import photoPlaceholder from '../../../assets/userPhoto.png';
import photoPlaceholderD from '../../../assets/userPhotoDark.png';
import { useDarkMode } from 'usehooks-ts';
import classNames from 'classnames/bind';

export const Posts: React.FC = () => {
  const cx = classNames.bind(styles);
  const { isDarkMode } = useDarkMode();
  const { posts } = useSelector(s => s.posts);
  const isOwner = useSelector(selectIsOwner);
  const userId = useSelector(s => s.auth.id);

  const [createPostMode, setCreatePostMode] = useState(false);

  return (
    <div className={styles.postsWrapper}>
      {isOwner && (
        <div className={cx({ createPost: true, createPostD: isDarkMode })}>
          <div className={styles.userAvatar}>
            <img
              src={getUserPhoto(userId as number)}
              onError={(e: BaseSyntheticEvent) => {
                e.target.onerror = null;
                e.target.src = isDarkMode
                  ? photoPlaceholderD
                  : photoPlaceholder;
              }}
              alt='user avatar'
            />
          </div>
          <div className={styles.createPostButton}>
            <button onClick={() => setCreatePostMode(true)}>Create post</button>
          </div>
        </div>
      )}

      {posts.length > 0 && isOwner ? (
        <div className={styles.main}>
          <div className={styles.title}>
            <span>Posts</span>
          </div>
          <ul className={styles.posts}>
            {posts.map(post => (
              <Post post={post} key={post.id} />
            ))}
          </ul>
        </div>
      ) : (
        <div className={cx({ noPosts: true, noPostsD: isDarkMode })}>
          <div className={styles.title}>
            <span>Posts</span>
          </div>
          <div className={styles.noPostsInner}>
            <NoDataIcon size='100px' />
            <span>No posts yet</span>
          </div>
        </div>
      )}

      {createPostMode && <CreatePost setCreatePostMode={setCreatePostMode} />}
    </div>
  );
};
