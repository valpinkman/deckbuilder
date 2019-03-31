import { Reducer } from 'redux'

export interface Deck {
  id: string;
  cards: any[];
}

export interface DecksState {
  decks: Deck[];
}

export const decks: DecksState = {
  decks: [],
}

export const decksReducer: Reducer<DecksState> = (
  state: DecksState = decks,
  action
): DecksState => state
