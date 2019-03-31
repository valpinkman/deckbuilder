import {
  createStore,
  Store,
  Reducer,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { create } from 'redux-react-hook'
import { AppState, appReducer, app } from './reducers/appReducer'
import { SearchState, searchReducer, search } from './reducers/searchReducer'
import { DecksState, decksReducer, decks } from './reducers/decksReducer'
import { searchCardsEpic } from './epics/searchCardsEpic'
import { SearchActions } from './actions/searchActions'
import { DecksActions } from './actions/decksAction'
import { ajax } from 'rxjs/ajax'

export type Actions = SearchActions

export interface StoreState {
  app: AppState;
  search: SearchState;
  decks: DecksState;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

const initialState: StoreState = {
  app: app,
  decks: decks,
  search: search,
}

export function makeStore(): Store<StoreState, Actions> {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const epicMiddleware = createEpicMiddleware({
    dependencies: { getJSON: ajax.getJSON },
  })

  const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
    app: appReducer,
    decks: decksReducer,
    search: searchReducer,
  })

  const rootEpic = combineEpics(searchCardsEpic)

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware))
  )

  epicMiddleware.run(rootEpic)

  return store
}

export const { StoreContext, useDispatch, useMappedState } = create<
StoreState,
Actions,
Store<StoreState, Actions>
>()
