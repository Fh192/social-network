import { createReducer } from '@reduxjs/toolkit';
import { GetState, RootDispatch } from '../';
import { getUserPhoto } from '../../common/getUserPhoto';
import { addPost, commentPost, deletePost, likePost } from '../actions/posts';
import { IComment, IPost } from './../../types/posts';

export interface PostsState {
  posts: Array<IPost>;
}

const initialState: PostsState = {
  posts: JSON.parse(localStorage.getItem('posts') || '[]'),
};

const postsReducer = createReducer(initialState, b => {
  b.addCase(addPost, (state, action) => {
    state.posts.unshift(action.payload);
    localStorage.setItem('posts', JSON.stringify(state.posts));
  });

  b.addCase(deletePost, (state, action) => {
    const postId = action.payload;

    state.posts = state.posts.filter(({ id }) => id !== postId);
    localStorage.setItem('posts', JSON.stringify(state.posts));
  });

  b.addCase(likePost, (state, action) => {
    const { postId, userId } = action.payload;
    const postIndex = state.posts.findIndex(post => post.id === postId);
    const postLikes = state.posts[postIndex].likes;
    const isPostLiked = postLikes.some(id => id === userId);

    if (isPostLiked) {
      state.posts[postIndex].likes = postLikes.filter(id => id !== userId);
    } else {
      state.posts[postIndex].likes.push(userId);
    }

    localStorage.setItem('posts', JSON.stringify(state.posts));
  });

  b.addCase(commentPost, (state, action) => {
    const { postId, comment } = action.payload;
    const postIndex = state.posts.findIndex(post => post.id === postId);

    state.posts[postIndex].comments.unshift(comment);
    localStorage.setItem('posts', JSON.stringify(state.posts));
  });
});

export const createPost =
  (text = '', imageSrc = '') =>
  (dispatch: RootDispatch, getState: GetState) => {
    const { login: username, id } = getState().auth;
    const photo = getUserPhoto(id as number);

    const post: IPost = {
      text,
      imageSrc,
      id: Date.now(),
      addDate: +new Date(),
      author: { username, photo },
      comments: [],
      likes: [],
    };

    dispatch(addPost(post));
  };

export const createComment =
  (text: string, postId: number) =>
  (dispatch: RootDispatch, getState: GetState) => {
    const { login: username, id } = getState().auth;
    const photo = getUserPhoto(id as number);
    const author = { username, photo };

    const comment: IComment = {
      id: Date.now(),
      addDate: +new Date(),
      author,
      text,
      userId: Number(id),
    };

    dispatch(commentPost(comment, postId));
  };

export default postsReducer;
