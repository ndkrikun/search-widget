import axios, { AxiosResponse } from 'axios';
import { apiMethods, API_ROOT } from '../data/api-keys';
import { ApiResponse } from '../interfaces/api.model';
import { User } from '../interfaces/user.model';

/**
 * Service to work with users data
 */
class UsersStorage {
  /**
   * Api config
   */
  private config = apiMethods.GET_USERS;

  /**
   * Api pullpath to get users data
   */
  private get url(): string {
    return API_ROOT + this.config.path;
  }

  /**
   * Returns full name of specific user
   * @param user specific user
   */
  public getUserTitle(user: User): string {
    return `${user.first_name} ${user.last_name}`;
  }

  /**
   * Fetches users collection from API
   */
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
