import * as React from 'react';
import { SearchLine } from './search-line';
import { Dropdown } from './dropdown';
import { AppState } from '../interfaces/state.model';
import { defaultState } from '../data/state';
import { usersStorageService } from '../services/users-storage.service';
import { usersSearchService } from '../services/users-search.service';

export class App extends React.Component {
  /**
   * Application data
   */
  public readonly state: AppState = { ...defaultState };

  /**
   * Static user note
   */
  private readonly title = 'Here you can search for users from storage';

  constructor(
    props: any
  ) {
    super(props);
    this.initUsers();
  }

  /**
   * Initializes users collection
   */
  private async initUsers(): Promise<any> {
    const users = await usersStorageService.get();
    this.setState({ users });
  }

  /**
   * Butifies seach text
   * @param search search fragment
   */
  private modifySearchText(search: string): string {
    return search
      .toLowerCase()
      .split('')
      .map((char, i, array) =>
        (i === 0 || array[i - 1] === ' ')
          ? char.toUpperCase()
          : char
      )
      .join('');
  }

  /**
   * Sets state when input value changes
   * @param event input change event
   */
  private changeSearch(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const search = this.modifySearchText(event.target.value);

    this.setState({ search });

    const { suggest, filteredUsers } = usersSearchService.search(
      this.state.users,
      this.state.search
    );

    this.setState({ suggest, filteredUsers });
  }

  /**
   * React lifecycle hook
   */
  public render(): JSX.Element {
    return (
      <div>
        <h1 className='title'>{this.title}</h1>
        <SearchLine
          search={this.state.search}
          suggest={this.state.suggest}
          onChange={this.changeSearch.bind(this)} />
        <Dropdown users={this.state.filteredUsers} />
      </div>
    );
  }
}
