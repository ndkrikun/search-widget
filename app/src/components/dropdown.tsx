import * as React from 'react';
import { User } from '../interfaces/user.model';
import { usersStorageService } from '../services/users-storage.service';

interface DropdownProps {
  users: User[];
}

interface BackgroundImageStyle {
  backgroundImage: string;
}

export class Dropdown extends React.Component<DropdownProps, {}> {

  private getBackgroundStyle(
    url: string
  ): BackgroundImageStyle {
    return { backgroundImage: `url(${url})` }
  }

  private renderItem(
    user: User
  ): JSX.Element {
    const style = this.getBackgroundStyle(user.avatar);
    const title = usersStorageService.getUserTitle(user);
    return (
      <div className='dropdown__item' key={user.id}>
        <div className='dropdown__item-image' style={style}></div>
        <div className='dropdown__item-title'>{title}</div>
      </div>
    )
  }

  public render(): JSX.Element {
    const { users } = this.props;
    return !!users
      ? (
          <div className='dropdown'>
            {users.map(user => this.renderItem(user))}
          </div>
        )
      : (<div></div>);
  }
}
