import { useState, useCallback, useEffect } from 'react'
import { useMappedState, StoreState, useDispatch } from '../store'
import { fetchCards } from '../actions/searchActions'
import { SearchState } from '../reducers/searchReducer'

export default function useSearchCards() {
  const [term, setTerm] = useState()
  const { cards, status }: SearchState = useMappedState(
    useCallback((state: StoreState) => state.search, [])
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (term) {
      const search = (query: string) => dispatch(fetchCards(query))
      search(term)
    }
  }, [term])

  return { cards, setTerm, status }
}
