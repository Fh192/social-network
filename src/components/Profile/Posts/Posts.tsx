import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useDarkMode } from 'usehooks-ts';
import { getUserPhoto } from '../../../common/getUserPhoto';
import { useSelector } from '../../../hooks/useSelector';
import { useUserPhoto } from '../../../hooks/useUserPhoto';
import { selectIsOwner } from '../../../store/selectors/profileSelectors';
import NoDataIcon from '../../../svg/NoDataIcon';
import CreatePost from './CreatePost/CreatePost';
import Post from './Post/Post';
import styles from './Posts.module.css';

export const Posts: React.FC = () => {
  const cx = classNames.bind(styles);

  const isOwner = useSelector(selectIsOwner);
  const userId = useSelector(s => s.auth.id);
  const [createPostMode, setCreatePostMode] = useState(false);
  const { isDarkMode } = useDarkMode();
  const { posts } = useSelector(s => s.posts);
  const { photo, photoErrorHandler } = useUserPhoto(
    getUserPhoto(userId as number)
  );

  return (
    <div className={styles.postsWrapper}>
      {isOwner && (
        <div className={cx({ createPost: true, createPostD: isDarkMode })}>
          <div className={styles.userAvatar}>
            <img src={photo} alt="user avatar" onError={photoErrorHandler} />
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
            <NoDataIcon size="100px" />
            <span>No posts yet</span>
          </div>
        </div>
      )}

      {createPostMode && <CreatePost setCreatePostMode={setCreatePostMode} />}
    </div>
  );
};
