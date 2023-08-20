import { useState, useEffect } from 'react'

export function useMovie(query) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchMovies() {
      try {
        setError('')
        setIsLoading(true)

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=c7fc08cd&s=${query}`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error('NETWORK CONNECTION ERROR')
        const data = await res.json()

        if (data.Response === 'False') throw new Error('MOVIE NOT FOUND!')
        setMovies(data.Search)
        setError('')
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (query.length < 3) {
      setError('')
      setMovies([])
      return
    }
    // handleCloseMovie();
    fetchMovies()
    return function () {
      controller.abort()
    }
  }, [query])
  return { movies, isLoading, error }
}
