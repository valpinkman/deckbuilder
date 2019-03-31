import { Reducer } from 'redux'

export interface AppState {
  name: string;
}

export const app = {
  name: 'Deck Builder',
}

export const appReducer: Reducer<AppState> = (
  state: AppState = app
): AppState => state
