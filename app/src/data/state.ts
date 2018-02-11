import { AppState } from '../interfaces/state.model';

export const defaultState: Readonly<AppState> = Object.freeze<AppState>({
  search: '',
  users: null,
  suggest: '',
  filteredUsers: null,
});
