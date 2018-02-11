import axios, { AxiosResponse } from 'axios';
import { apiMethods, API_ROOT } from '../data/api-keys';
import { ApiResponse } from '../interfaces/api.model';
import { User } from '../interfaces/user.model';

class UsersStorage {
  private config = apiMethods.GET_USERS;

  private get url(): string {
    return API_ROOT + this.config.path;
  }

  public getUserTitle(user: User): string {
    return `${user.first_name} ${user.last_name}`;
  }

  public get(): Promise<User[]> {
    return new Promise(resolve => {
      const { type } = this.config;

      axios({ url: this.url, method: type })
        .then((response: AxiosResponse<ApiResponse<User[]>>) => {
          resolve(response.data.data);
        });
    })
  }
}

export const usersStorageService = new UsersStorage;
