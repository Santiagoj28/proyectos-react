import { useEffect, useState } from "react";
import Header from "./components/headerComponents/Header";
import Logo from "./components/headerComponents/Logo";
import Search from "./components/Search";
import NumResults from "./components/headerComponents/NumResult";

import Box from "./components/ListBox";
import Summary from "./components/Summary";
import WacthedList from "./components/WacthedList";
import Main from "./components/Main";
import MovieList from "./components/MovieList";

import SelectedMovie from "./components/SelectedMovie";
import Loader from "./components/Loader";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = "de8f47b1";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watchMovie) =>
      watchMovie.filter((movie) => movie.imdbID !== id)
    );
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
    handleCloseMovie();

    return function () {
      controller.abort();
    };
  }, [query]);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <Header>
        <Logo />
        <Search query={query} setQuery={setQuery} />

        <NumResults>{movies}</NumResults>
      </Header>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              movieID={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary
                avgImdbRating={avgImdbRating}
                avgUserRating={avgUserRating}
                avgRuntime={avgRuntime}
                watched={watched}
              />
              <WacthedList
                watched={watched}
                onHandleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

const ErrorMessage = ({ message }) => {
  return (
    <>
      <p className="error">
        <span>⛔</span>
        {message}
      </p>
    </>
  );
};
