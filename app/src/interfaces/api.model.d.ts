import { User } from './user.model';

type RequestType = 'GET' | 'POST' | 'PUT' | 'PATCH';

export interface ApiResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T;
}

interface ApiMethod {
  path: string;
  type: RequestType;
}

export interface ApiMethods {
  GET_USERS: ApiMethod;
}