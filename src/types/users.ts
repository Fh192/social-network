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
