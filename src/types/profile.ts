export interface IProfile extends IProfileForUpdate {
  userId: number | null;
  photos: IPhotos;
}

export interface IPhotos {
  small: string;
  large: string;
}

export interface IContacts {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
}

export interface IProfileForUpdate {
  aboutMe: string | null;
  contacts: IContacts;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string;
}
