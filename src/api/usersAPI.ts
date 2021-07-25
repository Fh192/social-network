import { IUsersResponse } from './../types/users';
import instance from './instance';

const usersAPI = {
  getUsers: async (
    count?: number,
    page?: number,
    term?: string,
    friend?: boolean
  ) => {
    const props = { count, page, term, friend };
    let url = 'users?';

    Object.entries(props).forEach(prop => {
      if (prop[1] !== undefined) {
        url = `${url}&${prop[0]}=${prop[1]}`;
      }
    });

    if (url[url.indexOf('?') + 1] === '&') {
      url = url.replace(url[url.indexOf('?') + 1], '');
    }

    const response = await instance.get<IUsersResponse>(url);

    return response.data;
  },
};

export default usersAPI;
