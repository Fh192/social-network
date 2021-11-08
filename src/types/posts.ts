export interface IPost {
  id: number;
  addDate: number;
  author: IPostAuthor;
  text: string;
  imageSrc: string;
  comments: Array<IComment>;
  likes: Array<number>;
}

export interface IPostAuthor {
  username: string;
  photo: string;
}

export interface IComment {
  id: number;
  addDate: number;
  author: IPostAuthor;
  text: string;
  userId: number;
}
