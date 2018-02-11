import { ApiMethods } from '../interfaces/api.model';

export const API_ROOT = 'https://reqres.in/api';

export const apiMethods: ApiMethods = {
  GET_USERS: { path: '/users?per_page=12', type: 'GET' },
};
