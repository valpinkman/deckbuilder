import React from 'react'
import useSearchCards from '../../hooks/use-cards-search'

import styles from './Search.module.css'
import CardList from '../Cards/CardList'
import SearchBar from './SearchBar'

const Search = () => {
  const { setTerm, reset } = useSearchCards()
  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>Card Search</h1>
        <SearchBar onChange={setTerm} onReset={reset} />
      </section>
      <section>
        <CardList />
      </section>
    </>
  )
}

export default Search
