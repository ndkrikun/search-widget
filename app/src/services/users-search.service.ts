import { User } from '../interfaces/user.model';

interface SearchResult {
  filteredUsers: User[];
  suggest: string;
}

class UsersSearch {
  private readonly searchKeys: ReadonlyArray<keyof User> = Object.freeze<keyof User>([
    'first_name', 'last_name'
  ])

  private isNecessaryKey(key: keyof User): boolean {
    return this.searchKeys.indexOf(key) >= 0;
  }

  private isValidPattern(pattern: string): boolean {
    return !!pattern && pattern.length > 1;
  }

  private isBeginningPattern(
    string: string,
    substring: string
  ): boolean {
    return string.toLowerCase().indexOf(
      substring.toLowerCase()
    ) === 0
  }

  private containsPattern(
    string: string,
    substring: string
  ): boolean {
    return string.toLowerCase().includes(
      substring.toLowerCase()
    );
  }

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

    console.log({ filteredUsers, suggest });
    return { filteredUsers, suggest };
  }
}

export const usersSearchService = new UsersSearch;
