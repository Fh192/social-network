import React, { useState } from 'react';
import { RootState } from '../../../store/store';
import { IPost } from '../../../types/posts';
import CreatePost from './CreateTweet/CreatePost';
import styles from './Posts.module.css';
import {
  addPost,
  deletePost,
  deleteAllPosts,
} from '../../../store/reducers/postsReducer';
import { connect } from 'react-redux';

interface MapStateProps {
  posts: Array<IPost>;
}

interface MapDispatchProps {
  addPost: (post: IPost) => void;
  deletePost: (postId: number) => void;
  deleteAllPosts: () => void;
}

interface Props extends MapStateProps, MapDispatchProps {
  username: string;
  userAvatar: string;
}

const Posts: React.FC<Props> = ({
  posts,
  userAvatar,
  username,
  addPost,
  deletePost,
}) => {
  const [createPostMode, setCreatePostMode] = useState(false);

  return (
    <div className={styles.postsWrapper}>
      {createPostMode && (
        <CreatePost
          posts={posts}
          username={username}
          userAvatar={userAvatar}
          setCreatePostMode={setCreatePostMode}
          addPost={addPost}
        />
      )}
      <div className={styles.createPost}>
        <div className={styles.userAvatar}>
          <img src={userAvatar} alt='user avatar' />
        </div>
        <div className={styles.createPostButton}>
          <button onClick={() => setCreatePostMode(true)}>Create post</button>
        </div>
      </div>
      <div className={styles.title}>Posts</div>
      <ul className={styles.posts}>
        <li className={styles.post}></li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  posts: state.posts,
});

export default connect(mapStateToProps, {
  addPost,
  deletePost,
  deleteAllPosts,
})(Posts);
