import { Reducer } from 'redux'

export interface AppState {
  name: string;
}

const initialState = {
  name: 'Deck Builder',
}

export const appReducer: Reducer<AppState> = (
  state: AppState = initialState
): AppState => state
