import { Reducer } from 'redux'
import {
  Card,
  SearchActions,
  SEARCH_CARDS_START,
  SEARCH_CARDS_SUCCESS,
  SEARCH_CARDS_RESET,
  SEARCH_CARDS_ERROR,
} from '../actions/searchActions'

export interface SearchState {
  status: 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';
  cards: Card[];
  error: Error | null;
}

export const search: SearchState = {
  status: 'IDLE',
  cards: [],
  error: null,
}

export const searchReducer: Reducer<SearchState> = (
  state: SearchState = search,
  action: SearchActions
): SearchState => {
  switch (action.type) {
    case SEARCH_CARDS_START: {
      return {
        ...state,
        status: 'PENDING',
      }
    }
    case SEARCH_CARDS_SUCCESS: {
      return {
        ...state,
        status: 'SUCCESS',
        cards: action.payload,
      }
    }
    case SEARCH_CARDS_RESET: {
      return {
        ...state,
        status: 'IDLE',
        cards: [],
      }
    }
    case SEARCH_CARDS_ERROR: {
      return {
        ...state,
        status: 'ERROR',
        error: action.payload,
      }
    }
    default:
      return state
  }
}
