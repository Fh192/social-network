import { ThunkAction } from 'redux-thunk';
import { IPost, IComment } from './../../types/posts';
import { Actions, RootState } from './../store';
import { Nullable } from '../../types/common';
import * as actions from '../actions/posts';

type PostsState = typeof initialState;
type PostsActions = ReturnType<Actions<typeof actions>>;
type PostsThunk = ThunkAction<void, RootState, unknown, PostsActions>;

const initialState = JSON.parse(
  localStorage.getItem('posts') || '[]'
) as Array<IPost>;

//!!! REFACTOR !!!
// DUPLICATE CODE IN CASES
//!!! REFACTOR !!!
// DUPLICATE CODE IN CASES
//!!! REFACTOR !!!
// DUPLICATE CODE IN CASES

const postsReducer = (
  state = initialState,
  action: PostsActions
): PostsState => {
  switch (action.type) {
    case 'actions/posts/ADD_POST':
      localStorage.setItem('posts', JSON.stringify([action.payload, ...state]));
      return [action.payload, ...state];

    case 'actions/posts/DELETE_POST':
      localStorage.setItem(
        'posts',
        JSON.stringify(state.filter(post => post.postId !== action.payload))
      );
      return state.filter(post => post.postId !== action.payload);

    case 'actions/posts/DELETE_ALL_POSTS':
      localStorage.removeItem('posts');
      return [];

    case 'actions/posts/LIKE_POST':
      localStorage.setItem(
        'posts',
        JSON.stringify(
          state.map(post => {
            if (
              post.postId === action.payload.postId &&
              action.payload.userId
            ) {
              if (post.whoLiked.some(id => id === action.payload.userId)) {
                return {
                  ...post,
                  likes: post.likes - 1,
                  whoLiked: post.whoLiked.filter(
                    userId => userId !== action.payload.userId
                  ),
                };
              } else {
                return {
                  ...post,
                  likes: post.likes + 1,
                  whoLiked: [...post.whoLiked, action.payload.userId],
                };
              }
            } else return post;
          })
        )
      );
      return state.map(post => {
        if (post.postId === action.payload.postId && action.payload.userId) {
          if (post.whoLiked.some(id => id === action.payload.userId)) {
            return {
              ...post,
              likes: post.likes - 1,
              whoLiked: post.whoLiked.filter(
                userId => userId !== action.payload.userId
              ),
            };
          } else {
            return {
              ...post,
              likes: post.likes + 1,
              whoLiked: [...post.whoLiked, action.payload.userId],
            };
          }
        } else return post;
      });

    case 'actions/posts/ADD_COMMENT':
      localStorage.setItem(
        'posts',
        JSON.stringify(
          state.map(post => {
            if (post.postId === action.payload.postId) {
              return {
                ...post,
                comments: [action.payload.comment, ...post.comments],
              };
            } else return post;
          })
        )
      );
      return state.map(post => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            comments: [action.payload.comment, ...post.comments],
          };
        } else return post;
      });

    default:
      return state;
  }
};
//!!! REFACTOR !!!
// DUPLICATE CODE IN CASES
//!!! REFACTOR !!!
// DUPLICATE CODE IN CASES

export const addPost =
  (post: IPost): PostsThunk =>
  dispatch => {
    dispatch(actions.addPost(post));
  };

export const deletePost =
  (postId: number): PostsThunk =>
  dispatch => {
    dispatch(actions.deletePost(postId));
  };

export const deleteAllPosts = (): PostsThunk => dispatch => {
  dispatch(actions.deleteAllPosts());
};

export const likePost =
  (postId: number, userId: number | null): PostsThunk =>
  dispatch => {
    dispatch(actions.likePost(postId, userId));
  };

export const addComment =
  (comment: IComment, postId: number): PostsThunk =>
  dispatch => {
    dispatch(actions.addComment(comment, postId));
  };

export default postsReducer;
