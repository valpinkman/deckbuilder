import { Reducer } from 'redux'
import {
  Card,
  SearchActions,
  SEARCH_CARDS_START,
  SEARCH_CARDS_SUCCESS,
  SEARCH_CARDS_ERROR,
  CANCEL_SEARCH,
} from '../actions/searchActions'

export type Status = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'

export interface SearchState {
  status: Status;
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

    case CANCEL_SEARCH: {
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
