import { User } from './user.model';

export interface AppState {
  search: string;
  users: User[];
  suggest: string;
  filteredUsers: User[];
}
