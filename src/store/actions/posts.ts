import { IPost } from './../../types/posts';

const ADD_POST = 'actions/posts/ADD_POST';
const DELETE_POST = 'actions/posts/DELETE_POST';

export const addPost = (post: IPost) =>
  ({ type: ADD_POST, payload: post } as const);

export const deletePost = (postId: number) =>
  ({ type: DELETE_POST, payload: postId } as const);
