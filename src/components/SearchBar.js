import { useRef } from 'react'
import { useKey } from './useKey'

function SearchBar({ query, onSetQuery }) {
  const inputEl = useRef(null)

  useKey('Enter', () => {
    if (document.activeElement === inputEl.current) return
    inputEl.current.focus()
    onSetQuery('')
  })

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

export default SearchBar
