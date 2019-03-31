import { TestScheduler } from 'rxjs/testing'
import { searchCardsEpic } from '../searchCardsEpic'

const createScheduler = (): TestScheduler =>
  new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected)
  })

describe('searchCardsEpic', () => {
  it('it search cards successfully', () => {
    const scheduler = createScheduler()
    scheduler.run(helpers => {
      const { cold, hot, expectObservable } = helpers

      const response = [{ name: 'avatar of woe' }]

      const action$ = hot('-a', {
        a: { type: 'FETCH_CARDS', payload: 'avatar' },
      })
      const state$ = null
      const dependencies = {
        getJSON: () => cold('--a', { a: { data: response } }),
      }

      const output$ = searchCardsEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('500ms -a-b', {
        a: {
          type: 'SEARCH_CARDS_START',
        },
        b: {
          type: 'SEARCH_CARDS_SUCCESS',
          payload: response,
        },
      })
    })
  })

  it('it search cards with error', () => {
    const scheduler = createScheduler()
    scheduler.run(helpers => {
      const { cold, hot, expectObservable } = helpers

      const error = new Error('yolo')

      const action$ = hot('-a', {
        a: { type: 'FETCH_CARDS', payload: 'avatar' },
      })
      const state$ = null
      const dependencies = {
        getJSON: () => cold('--#', undefined, error),
      }

      const output$ = searchCardsEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('500ms -a-b', {
        a: {
          type: 'SEARCH_CARDS_START',
        },
        b: {
          type: 'SEARCH_CARDS_ERROR',
          payload: error,
        },
      })
    })
  })

  it('it search cards then cancel', () => {
    const scheduler = createScheduler()
    scheduler.run(helpers => {
      const { cold, hot, expectObservable } = helpers

      const action$ = hot('-a 500ms -b', {
        a: { type: 'FETCH_CARDS', payload: 'avatar' },
        b: { type: 'SEARCH_CARDS_RESET' },
      })
      const state$ = null
      const dependencies = {
        getJSON: (url: string) =>
          cold('--a', {
            a: { url },
          }),
      }

      const output$ = searchCardsEpic(action$, state$, dependencies)

      expectObservable(output$).toBe('500ms -a-b', {
        a: {
          type: 'SEARCH_CARDS_START',
        },
        b: {
          type: 'SEARCH_CARDS_RESET',
        },
      })
    })
  })
})
