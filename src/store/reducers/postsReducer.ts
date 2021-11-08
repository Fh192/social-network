import { IPost, IComment } from './../../types/posts';
import { GetState, RootDispatch } from '../';
import { addPost, deletePost, commentPost, likePost } from '../actions/posts';
import { getUserPhoto } from '../../common/getUserPhoto';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  posts: JSON.parse(localStorage.getItem('posts') || '[]') as Array<IPost>,
};

const postsReducer = createReducer(initialState, b => {
  b.addCase(addPost, (state, action) => {
    state.posts.unshift(action.payload);
    localStorage.setItem('posts', JSON.stringify(state.posts));
  });

  b.addCase(deletePost, (state, action) => {
    const postId = action.payload;

    state.posts = state.posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(state.posts));
  });

  b.addCase(likePost, (state, action) => {
    const postId = action.payload.postId;
    const userId = action.payload.userId;
    const postIndex = state.posts.findIndex(post => post.id === postId);
    const isPostLiked = state.posts[postIndex].likes.some(id => id === userId);

    if (!isPostLiked) {
      state.posts[postIndex].likes.push(userId);
    } else {
      state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
        id => id !== userId
      );
    }
    localStorage.setItem('posts', JSON.stringify(state.posts));
  });

  b.addCase(commentPost, (state, action) => {
    const comment = action.payload.comment;
    const postId = action.payload.postId;
    const postIndex = state.posts.findIndex(post => post.id === postId);

    state.posts[postIndex].comments.unshift(comment);
    localStorage.setItem('posts', JSON.stringify(state.posts));
  });
});

export const createPost =
  (content: { text?: string; imageSrc?: string }) =>
  (dispatch: RootDispatch, getState: GetState) => {
    const { login: username, id } = getState().auth;
    const photo = getUserPhoto(id as number);

    const post = {
      ...content,
      id: Date.now(),
      addDate: +new Date(),
      author: { username, photo },
      comments: [],
      likes: [],
    } as IPost;

    dispatch(addPost(post));
  };

export const createComment =
  (text: string, postId: number) =>
  (dispatch: RootDispatch, getState: GetState) => {
    const { login: username, id } = getState().auth;
    const photo = getUserPhoto(id as number);
    const author = { username, photo };

    const comment = {
      id: Date.now(),
      addDate: +new Date(),
      author,
      text,
      userId: id,
    } as IComment;

    dispatch(commentPost(comment, postId));
  };

export default postsReducer;
