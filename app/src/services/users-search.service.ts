import { User } from '../interfaces/user.model';

interface SearchResult {
  filteredUsers: User[];
  suggest: string;
}

/**
 * Service to search through users data
 */
class UsersSearch {
  /**
   * Keys from user model that are required to be used in search logic
   */
  private readonly searchKeys: ReadonlyArray<keyof User> = Object.freeze<keyof User>([
    'first_name', 'last_name'
  ])

  /**
   * Checks if key is required for search
   * @param key user model key
   */
  private isNecessaryKey(key: keyof User): boolean {
    return this.searchKeys.indexOf(key) >= 0;
  }

  /**
   * Tells if search fragmet is valid to be used for search
   * @param pattern serach fragment
   */
  private isValidPattern(pattern: string): boolean {
    return !!pattern && pattern.length > 1;
  }

  /**
   * Tells if subsctring goes from the beggining of string
   * @param string word
   * @param substring part of word
   */
  private isBeginningPattern(
    string: string,
    substring: string
  ): boolean {
    return string.toLowerCase().indexOf(
      substring.toLowerCase()
    ) === 0
  }

  /**
   * Tells if string contains substring
   * @param string word
   * @param substring part of word
   */
  private containsPattern(
    string: string,
    substring: string
  ): boolean {
    return string.toLowerCase().indexOf(
      substring.toLowerCase()
    ) >= 0;
  }

  /**
   * Tries to fing a suggest for search
   * @param user separate user
   * @param pattern search fragment
   */
  private getSuggest(
    user: User,
    pattern: string
  ): string {
    return Object.keys(user).reduce(
      (acc, key: keyof User) => (
        this.isNecessaryKey(key) && this.isBeginningPattern(String(user[key]), pattern)
      ) ? user[key] as string : acc,
      ''
    )
  }

  /**
   * Public method that could be called from outside
   * @param users collection of users
   * @param pattern search fragment
   */
  public search(users: User[], pattern: string): SearchResult {
    const filteredUsers = users.filter(user =>
      Object.keys(user).some((key: keyof User) =>
        this.isValidPattern(pattern) &&
        this.isNecessaryKey(key) &&
        this.containsPattern(String(user[key]), pattern)
      )
    );

    const suggest: string = filteredUsers.reduce((acc, user) => {
      const word = this.getSuggest(user, pattern);
      return !!word && !acc ? word : acc;
    }, '');

    return { filteredUsers, suggest };
  }
}

export const usersSearchService = new UsersSearch;
