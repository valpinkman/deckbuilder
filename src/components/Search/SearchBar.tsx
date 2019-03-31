import React from 'react'

import { Status } from '../../reducers/searchReducer'
import Dr0p from '../Dr0p'

import styles from './SearchBar.module.css'

interface Props {
  onChange: (val: string) => void;
  onReset: () => void;
  status?: Status;
}

interface CloseProps {
  onClick: () => void;
}

const Close = ({ onClick }: CloseProps) => (
  <button type="button" onClick={onClick} className={styles.close}>
    <span className={styles['close-text']}>x</span>
  </button>
)

const SearchBar = ({ onChange, onReset, status }: Props) => (
  <div className={styles.search}>
    <Dr0p height={24} />
    <input
      className={styles.input}
      type="text"
      onChange={evt => onChange(evt.target.value)}
    />
    {status === 'PENDING' || status === 'SUCCESS' ? (
      <Close onClick={onReset} />
    ) : null}
  </div>
)

export default SearchBar
