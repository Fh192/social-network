import { createAction } from '@reduxjs/toolkit';
import { IPost, IComment } from './../../types/posts';

export const addPost = createAction<IPost>('posts/ADD_POST');

export const deletePost = createAction<number>('posts/DELETE_POST');

export const likePost = createAction(
  'posts/LIKE_POST',
  (postId: number, userId: number) => ({ payload: { postId, userId } })
);

export const commentPost = createAction(
  'posts/ADD_COMMENT',
  (comment: IComment, postId: number) => ({
    payload: { comment, postId },
  })
);
