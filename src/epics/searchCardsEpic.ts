import { of, concat, fromEvent, race, Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { ofType, Epic } from 'redux-observable'
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
} from '../actions/searchActions'
import { Actions } from '../store'

export const searchCardsEpic: Epic<Actions, Actions> = (
  action$: Observable<Actions>
) => {
  const cancel$ = fromEvent(document, 'keydown').pipe(
    filter((evt: any) => evt.keyCode === 27),
    mapTo(cancelSearch())
  )

  return action$.pipe(
    ofType(FETCH_CARDS),
    debounceTime(500),
    filter(({ payload }: any) => payload && payload.trim() !== ''),
    switchMap(({ payload }) =>
      concat(
        of(searchStart()),
        race(
          ajax.getJSON(searchCardUrl(payload)).pipe(
            map((val: any) => searchSuccess(val.data)),
            catchError(err => of(searchError(err)))
          ),
          cancel$
        )
      )
    )
  )
}
