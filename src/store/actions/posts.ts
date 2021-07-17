import { IPost } from './../../types/posts';

const ADD_POST = 'actions/posts/ADD_POST';
const DELETE_POST = 'actions/posts/DELETE_POST';
const DELETE_ALL_POSTS = 'actions/posts/DELETE_ALL_POSTS';

export const addPost = (post: IPost) =>
  ({ type: ADD_POST, payload: post } as const);

export const deletePost = (postId: number) =>
  ({ type: DELETE_POST, payload: postId } as const);

export const deleteAllPosts = () => ({ type: DELETE_ALL_POSTS } as const);
