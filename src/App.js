import { useState } from "react";

import { useMovie } from "./components/useMovie";
import { useLocalStorage } from "./components/useLocalStorage";

import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovie(query);
  const [watched, setWatched] = useLocalStorage([], "watched");

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watchedMovie) => [...watchedMovie, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <SearchBar query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList onSelectedId={handleSelectedId} movies={movies} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              onAddWatched={handleAddWatched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
