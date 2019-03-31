import React, { useCallback } from 'react'
import useSearchCards from '../../hooks/use-cards-search'

import { StoreState, useMappedState } from '../../store'
import { SearchState } from '../../reducers/searchReducer'
import CardList from '../Cards/CardList'
import SearchBar from './SearchBar'

import styles from './Search.module.css'

const Search = () => {
  const mapState = useCallback(
    (state: StoreState): SearchState => ({ ...state.search }),
    []
  )
  const { status } = useMappedState(mapState)

  const { setTerm, reset } = useSearchCards()

  const onReset = () => {
    setTerm('')
    reset()
  }

  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>Card Search</h1>
        <SearchBar onChange={setTerm} onReset={onReset} status={status} />
      </section>
      <section>
        <CardList />
      </section>
    </>
  )
}

export default Search
