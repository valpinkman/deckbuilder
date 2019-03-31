import {
  createStore,
  Store,
  Reducer,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { AppState, appReducer } from './reducers/appReducer'

export interface StoreState {
  app: AppState;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

function configureStore(): Store<StoreState> {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const epicMiddleware = createEpicMiddleware()

  const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
    app: appReducer,
  })

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  )

  // epicMiddleware.run()

  return store
}

export default configureStore
