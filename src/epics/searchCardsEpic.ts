import { of, concat, fromEvent, race } from 'rxjs'
import { ofType } from 'redux-observable'
import {
  switchMap,
  map,
  debounceTime,
  filter,
  catchError,
  mapTo,
} from 'rxjs/operators'

import { searchCardUrl } from '../api/scryfall'
import {
  searchSuccess,
  searchError,
  FETCH_CARDS,
  searchStart,
  cancelSearch,
  SEARCH_CARDS_RESET,
} from '../actions/searchActions'

export const searchCardsEpic = (
  action$: any,
  state$: any,
  { getJSON }: { getJSON: (url: string) => any }
) => {
  const cancel$ = concat(
    fromEvent(document, 'keydown').pipe(
      filter((evt: any) => evt.keyCode === 27),
      mapTo(cancelSearch())
    ),
    action$.pipe(
      ofType(SEARCH_CARDS_RESET),
      mapTo(cancelSearch())
    )
  )

  return action$.pipe(
    ofType(FETCH_CARDS),
    debounceTime(500),
    filter(({ payload }) => payload && payload.length > 2),
    filter(({ payload }) => payload && payload.trim() !== ''),
    switchMap(({ payload }) =>
      concat(
        of(searchStart()),
        race(
          getJSON(searchCardUrl(payload)).pipe(
            map((val: any) => searchSuccess(val.data)),
            catchError(err => of(searchError(err)))
          ),
          cancel$
        )
      )
    )
  )
}
