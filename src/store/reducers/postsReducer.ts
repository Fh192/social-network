import { IPost } from './../../types/posts';
import { Actions } from './../store';
import { Nullable } from '../../types/common';
import * as actions from '../actions/posts';

type PostsState = typeof initialState;
type PostsActions = ReturnType<Actions<typeof actions>>;

const initialState = {
  posts: JSON.parse(localStorage.getItem('post') || '[]') as Array<IPost>,
};

const postsReducer = (
  state = initialState,
  action: PostsActions
): PostsState => {
  switch (action.type) {
    case 'actions/posts/ADD_POST':
      return { ...state, posts: [...state.posts, action.payload] };

    case 'actions/posts/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.postId !== action.payload),
      };

    default:
      return state;
  }
};

export default postsReducer;
