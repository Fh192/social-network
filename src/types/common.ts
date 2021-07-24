export type ResultCodes = 0 | 1 | 10;

export interface ServerData {
  resultCode: ResultCodes;
  messages: Array<string>;
}

export interface IPhotos {
  small: string;
  large: string;
}

export type Nullable<T> = null | T;
