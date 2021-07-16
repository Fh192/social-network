export interface IPost {
  postId: number;
  addDate: Date;
  author: IPostAuthor;
  text: string;
  imageSrc: string;
  comments: Array<IComment>;
  likes: number;
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
