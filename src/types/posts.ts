import { DateLocale } from 'yup/lib/locale';

export interface IPost {
  postId: number;
  addDate: string;
  author: IPostAuthor;
  text: string;
  imageSrc: string;
  comments: Array<IComment>;
  likes: number;
  whoLiked: Array<number>;
}

export interface IPostAuthor {
  username: string;
  avatar: string;
}

export interface IComment {
  commentId: number;
  addDate: Date;
  author: IPostAuthor;
  text: string;
}
