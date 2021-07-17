import { ThunkAction } from 'redux-thunk';
import { IPost } from './../../types/posts';
import { Actions, RootState } from './../store';
import { Nullable } from '../../types/common';
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
      localStorage.setItem('posts', JSON.stringify([...state, action.payload]));
      return [...state, action.payload];

    case 'actions/posts/DELETE_POST':
      localStorage.setItem(
        'posts',
        JSON.stringify(state.filter(post => post.postId !== action.payload))
      );
      return state.filter(post => post.postId !== action.payload);

    case 'actions/posts/DELETE_ALL_POSTS':
      localStorage.removeItem('posts');
      return [];

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

export const deleteAllPosts = (): PostsThunk => dispatch => {
  dispatch(actions.deleteAllPosts());
};

export default postsReducer;
