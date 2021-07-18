import React, { useState } from 'react';
import { RootState } from '../../../store/store';
import { IComment, IPost } from '../../../types/posts';
import CreatePost from './CreatePost/CreatePost';
import styles from './Posts.module.css';
import classNames from 'classnames/bind';
import {
  addPost,
  deletePost,
  deleteAllPosts,
  likePost,
  addComment,
} from '../../../store/reducers/postsReducer';
import { connect } from 'react-redux';
import Post from './Post/Post';
import Arrow from '../../../svg/Arrow';
import NoDataIcon from '../../../svg/NoDataIcon';

interface MapStateProps {
  posts: Array<IPost>;
  userId: number | null;
}

interface MapDispatchProps {
  addPost: (post: IPost) => void;
  deletePost: (postId: number) => void;
  deleteAllPosts: () => void;
  likePost: (postId: number, userId: number | null) => void;
  addComment: (comment: IComment, postId: number) => void;
}

interface Props extends MapStateProps, MapDispatchProps {
  username: string;
  userAvatar: string;
  isOwner: boolean;
}

const Posts: React.FC<Props> = ({
  posts,
  userAvatar,
  username,
  userId,
  isOwner,
  addPost,
  deletePost,
  deleteAllPosts,
  likePost,
  addComment,
}) => {
  const cx = classNames.bind(styles);

  const [createPostMode, setCreatePostMode] = useState(false);
  const [arrowType, setArrowType] = useState<'up' | 'down'>('down');
  const [selectedSortType, setSelectedSortType] = useState<
    'new' | 'old' | 'mostLiked' | 'mostCommented'
  >('new');

  const sortPosts = (
    sortType: 'new' | 'old' | 'mostLiked' | 'mostCommented'
  ) => {
    if (sortType === 'new') {
      posts.sort((a, b) => Date.parse(b.addDate) - Date.parse(a.addDate));
    }

    if (sortType === 'old') {
      posts.sort((a, b) => Date.parse(a.addDate) - Date.parse(b.addDate));
    }

    if (sortType === 'mostLiked') {
      posts.sort((a, b) => b.likes - a.likes);
    }

    if (sortType === 'mostCommented') {
      posts.sort((a, b) => b.comments.length - a.comments.length);
    }

    setSelectedSortType(sortType);
    setArrowType('down');
  };

  return (
    <div className={styles.postsWrapper}>
      {isOwner && (
        <div className={styles.createPost}>
          <div className={styles.userAvatar}>
            <img src={userAvatar} alt='user avatar' />
          </div>
          <div className={styles.createPostButton}>
            <button onClick={() => setCreatePostMode(true)}>Create post</button>
          </div>
        </div>
      )}

      {createPostMode && (
        <CreatePost
          posts={posts}
          username={username}
          userAvatar={userAvatar}
          setCreatePostMode={setCreatePostMode}
          addPost={addPost}
        />
      )}

      {posts.length > 0 && isOwner ? (
        <>
          <div className={styles.title}>
            <span>Posts</span>
            <div className={styles.sort}>
              <div
                className={styles.sortWrap}
                onClick={() =>
                  setArrowType(type => (type === 'down' ? 'up' : 'down'))
                }
              >
                <span>Sort</span>
                <div className={styles.arrow}>
                  <Arrow size='10px' type={arrowType} />
                </div>
              </div>

              {arrowType === 'up' && (
                <ul className={styles.sortPopup}>
                  <li
                    className={cx({
                      sortType: true,
                      selectedSortType: selectedSortType === 'new',
                    })}
                    onClick={() => sortPosts('new')}
                  >
                    Newest
                  </li>
                  <li
                    className={cx({
                      sortType: true,
                      selectedSortType: selectedSortType === 'old',
                    })}
                    onClick={() => sortPosts('old')}
                  >
                    Oldest
                  </li>
                  <li
                    className={cx({
                      sortType: true,
                      selectedSortType: selectedSortType === 'mostLiked',
                    })}
                    onClick={() => sortPosts('mostLiked')}
                  >
                    Most liked
                  </li>
                  <li
                    className={cx({
                      sortType: true,
                      selectedSortType: selectedSortType === 'mostCommented',
                    })}
                    onClick={() => sortPosts('mostCommented')}
                  >
                    Most commented
                  </li>
                </ul>
              )}
            </div>
          </div>
          <ul className={styles.posts}>
            {posts.map(post => (
              <Post
                userId={userId}
                post={post}
                deletePost={deletePost}
                likePost={likePost}
                addComment={addComment}
                key={post.postId}
              />
            ))}
          </ul>
        </>
      ) : (
        !isOwner && (
          <div className={styles.noPosts}>
            <NoDataIcon size='100px' />
            <span>No posts yet</span>
          </div>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  posts: state.posts,
  userId: state.auth.id,
});

export default connect(mapStateToProps, {
  addPost,
  deletePost,
  deleteAllPosts,
  likePost,
  addComment,
})(Posts);
