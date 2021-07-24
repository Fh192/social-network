import { IUsersResponse } from './../types/users';
import instance from './instance';

const usersAPI = {
  getUsers: async (
    count?: number,
    page?: number,
    term?: string,
    friend?: boolean
  ) => {
    const response = await instance.get<IUsersResponse>(
      `users?friend=${friend}&term=${term}&page=${page}&count=${count}`
    );
    return response.data;
  },
};

export default usersAPI;
