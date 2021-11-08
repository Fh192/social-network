import { IPhotos } from './common';

export interface IProfile {
  aboutMe: string | null;
  contacts: IContacts;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string;
  followed: boolean;
  inFollowProcess: boolean;
  userId: number | null;
  photos: IPhotos;
}

export interface IContacts {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  youtube: string | null;
}

export interface IProfileForUpdate {
  aboutMe?: string | null;
  contacts?: IContacts;
  lookingForAJob?: boolean;
  lookingForAJobDescription?: string | null;
  fullName?: string;
}
