import { useState, useEffect } from 'react'
import { useDispatch } from '../store'
import { fetchCards, searchReset } from '../actions/searchActions'

export default function useSearchCards() {
  const [term, setTerm] = useState()

  const dispatch = useDispatch()
  const search = (query: string) => {
    if (query) dispatch(fetchCards(query))
  }
  const reset = () => dispatch(searchReset())

  useEffect(() => {
    search(term)
  }, [term])

  return { setTerm, reset, term }
}
