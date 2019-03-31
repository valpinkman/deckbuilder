import React from 'react'

import { Status } from '../../reducers/searchReducer'
import Dr0p from '../Dr0p'

import styles from './SearchBar.module.css'

interface Props {
  onChange: (val: string) => void;
  onReset: () => void;
  status?: Status;
}

const SearchBar = ({ onChange, status }: Props) => (
  <div className={styles.search}>
    <Dr0p height={24} />
    <input
      className={styles.input}
      type="text"
      onChange={evt => onChange(evt.target.value)}
    />
  </div>
)

export default SearchBar
