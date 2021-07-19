import { IPost, IComment } from './../../types/posts';

const ADD_POST = 'actions/posts/ADD_POST';
const DELETE_POST = 'actions/posts/DELETE_POST';
const LIKE_POST = 'actions/posts/LIKE_POST';
const ADD_COMMENT = 'actions/posts/ADD_COMMENT';

export const addPost = (post: IPost) =>
  ({ type: ADD_POST, payload: post } as const);

export const deletePost = (postId: number) =>
  ({ type: DELETE_POST, payload: postId } as const);

export const likePost = (postId: number, userId: number | null) =>
  ({ type: LIKE_POST, payload: { postId, userId } } as const);

export const addComment = (comment: IComment, postId: number) =>
  ({ type: ADD_COMMENT, payload: { comment, postId } } as const);
