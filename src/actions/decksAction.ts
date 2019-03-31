export const CREATE_DECK = 'CREATE_DECK'
export type CREATE_DECK = typeof CREATE_DECK

export interface CreateDeckAction {
  type: CREATE_DECK;
  payload: string;
}

export type DecksActions = CreateDeckAction
