import * as React from 'react';
import { SearchLine } from './search-line';
import { Dropdown } from './dropdown';
import { AppState } from '../interfaces/state.model';
import { defaultState } from '../data/state';
import { usersStorageService } from '../services/users-storage.service';
import { usersSearchService } from '../services/users-search.service';

export class App extends React.Component {
  public readonly state: AppState = { ...defaultState };

  constructor(
    props: any
  ) {
    super(props);
    this.initUsers();
  }

  private async initUsers(): Promise<any> {
    const users = await usersStorageService.get();
    this.setState({ users });
  }

  private changeSearch(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    this.setState({ search: event.target.value });

    const { suggest, filteredUsers } = usersSearchService.search(
      this.state.users,
      this.state.search
    );

    this.setState({ suggest, filteredUsers });
  }

  public render(): JSX.Element {
    return (
      <div>
        <h1 className='title'>Start to typing name or surname (George, Rachel, Charles, etc)</h1>
        <SearchLine
          search={this.state.search}
          suggest={this.state.suggest}
          onChange={this.changeSearch.bind(this)} />
        <Dropdown users={this.state.filteredUsers} />
      </div>
    );
  }
}
