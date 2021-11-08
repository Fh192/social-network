import { Nullable, IPhotos } from './common';

export interface IUser {
  name: string;
  id: number;
  photos: IPhotos;
  status: Nullable<string>;
  followed: boolean;
}

export interface IUsersResponse {
  items: Array<IUser>;
  totalCount: number;
}

export interface IGetUsersParams {
  count: number;
  page: number;
  term?: string;
  friend?: boolean;
}

export interface IQueryParams {
  count: number;
  page: number;
  term?: string;
  friend?: boolean;
}
