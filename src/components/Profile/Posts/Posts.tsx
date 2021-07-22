import React, { useState } from 'react';
import { RootState } from '../../../store/store';
import { IComment, IPost } from '../../../types/posts';
import CreatePost from './CreatePost/CreatePost';
import styles from './Posts.module.css';
import classNames from 'classnames/bind';
import {
  addPost,
  deletePost,
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
  likePost,
  addComment,
}) => {
  const cx = classNames.bind(styles);

  type SortTypes = 'New' | 'Old' | 'Most liked' | 'Most commented';

  const sortTypesArr: Array<SortTypes> = [
    'New',
    'Old',
    'Most liked',
    'Most commented',
  ];

  const [createPostMode, setCreatePostMode] = useState(false);
  const [arrowType, setArrowType] = useState<'up' | 'down'>('down');
  const [selectedSortType, setSelectedSortType] = useState<SortTypes>('New');

  const sortPosts = (sortType: SortTypes) => {
    if (sortType === 'New') {
      posts.sort((a, b) => Date.parse(b.addDate) - Date.parse(a.addDate));
    }

    if (sortType === 'Old') {
      posts.sort((a, b) => Date.parse(a.addDate) - Date.parse(b.addDate));
    }

    if (sortType === 'Most liked') {
      posts.sort((a, b) => b.likes - a.likes);
    }

    if (sortType === 'Most commented') {
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
                  {sortTypesArr.map(sortType => (
                    <li
                      className={cx({
                        sortType: true,
                        selectedSortType: selectedSortType === sortType,
                      })}
                      onClick={() => sortPosts(sortType)}
                    >
                      {sortType}
                    </li>
                  ))}
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
  likePost,
  addComment,
})(Posts);
