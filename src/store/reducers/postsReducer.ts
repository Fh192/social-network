import { ThunkAction } from 'redux-thunk';
import { IPost, IComment } from './../../types/posts';
import { Actions, RootState } from './../store';
import * as actions from '../actions/posts';

type PostsState = typeof initialState;
type PostsActions = ReturnType<Actions<typeof actions>>;
type PostsThunk = ThunkAction<void, RootState, unknown, PostsActions>;

const initialState = JSON.parse(
  localStorage.getItem('posts') || '[]'
) as Array<IPost>;

const postsReducer = (
  state = initialState,
  action: PostsActions
): PostsState => {
  switch (action.type) {
    case 'actions/posts/ADD_POST':
      const stateWithNewPost = [action.payload, ...state];
      localStorage.setItem('posts', JSON.stringify(stateWithNewPost));

      return stateWithNewPost;

    case 'actions/posts/DELETE_POST':
      const deletePost = () => {
        return state.filter(post => post.postId !== action.payload);
      };

      localStorage.setItem('posts', JSON.stringify(deletePost()));
      return deletePost();

    case 'actions/posts/LIKE_POST':
      const likePost = () => {
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
      };

      localStorage.setItem('posts', JSON.stringify(likePost()));
      return likePost();

    case 'actions/posts/ADD_COMMENT':
      const addComment = () => {
        return state.map(post => {
          if (post.postId === action.payload.postId) {
            return {
              ...post,
              comments: [action.payload.comment, ...post.comments],
            };
          } else return post;
        });
      };

      localStorage.setItem('posts', JSON.stringify(addComment()));
      return addComment();

    default:
      return state;
  }
};

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
