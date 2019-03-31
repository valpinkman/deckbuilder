import { ActionCreator } from 'redux'

export const FETCH_CARDS = 'FETCH_CARDS'
export type FETCH_CARDS = typeof FETCH_CARDS

export const CANCEL_SEARCH = 'CANCEL_SEARCH'
export type CANCEL_SEARCH = typeof CANCEL_SEARCH

export const SEARCH_CARDS_START = 'SEARCH_CARDS_START'
export type SEARCH_CARDS_START = typeof SEARCH_CARDS_START

export const SEARCH_CARDS_SUCCESS = 'SEARCH_CARDS_SUCCESS'
export type SEARCH_CARDS_SUCCESS = typeof SEARCH_CARDS_SUCCESS

export const SEARCH_CARDS_ERROR = 'SEARCH_CARDS_ERROR'
export type SEARCH_CARDS_ERROR = typeof SEARCH_CARDS_ERROR

export const SEARCH_CARDS_RESET = 'SEARCH_CARDS_RESET'
export type SEARCH_CARDS_RESET = typeof SEARCH_CARDS_RESET

export interface Card {
  name: string;
  id: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  mana_cost: string;
  cmc: number;
  power: string;
  toughness: string;
  colors: string[];
  color_identity: string[];
  set: string;
  set_name: string;
}

export interface FetchCardsAction {
  type: FETCH_CARDS;
  payload: string;
}

export interface CancelSearchAction {
  type: CANCEL_SEARCH;
}

export interface SearchStartAction {
  type: SEARCH_CARDS_START;
}

export interface SearchSuccesstAction {
  type: SEARCH_CARDS_SUCCESS;
  payload: Card[];
}

export interface SearchErrortAction {
  type: SEARCH_CARDS_ERROR;
  payload: Error;
}

export interface SearchResetAction {
  type: SEARCH_CARDS_RESET;
}

export type SearchActions =
  | SearchStartAction
  | SearchSuccesstAction
  | SearchErrortAction
  | SearchResetAction
  | FetchCardsAction
  | CancelSearchAction

export const fetchCards: ActionCreator<FetchCardsAction> = (
  query: string
): FetchCardsAction => ({
  type: FETCH_CARDS,
  payload: query,
})

export const cancelSearch: ActionCreator<
CancelSearchAction
> = (): CancelSearchAction => ({
  type: CANCEL_SEARCH,
})

export const searchStart: ActionCreator<
SearchStartAction
> = (): SearchStartAction => ({
  type: SEARCH_CARDS_START,
})

export const searchSuccess: ActionCreator<SearchSuccesstAction> = (
  cards: Card[]
): SearchSuccesstAction => ({
  type: SEARCH_CARDS_SUCCESS,
  payload: cards,
})

export const searchError: ActionCreator<SearchErrortAction> = (
  error: Error
): SearchErrortAction => ({
  type: SEARCH_CARDS_ERROR,
  payload: error,
})

export const searchReset: ActionCreator<
SearchResetAction
> = (): SearchResetAction => ({
  type: SEARCH_CARDS_RESET,
})
