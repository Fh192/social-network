import { IUsersResponse } from './../types/users';
import instance from './instance';

const usersAPI = {
  getUsers: async (
    count?: number,
    page?: number,
    term?: string,
    friend?: boolean
  ) => {
    let url = 'users?';
    if (friend) url += `&friend=${friend}`;
    if (term) url += `&term=${term}`;
    if (page) url += `&page=${page}`;
    if (count) url += `&count=${count}`;

    const response = await instance.get<IUsersResponse>(url);
    return response.data;
  },
};

export default usersAPI;
