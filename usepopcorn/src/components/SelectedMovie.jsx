import { useEffect, useState } from "react";
import StarRating from "../Star";
import Loader from "./Loader";
const key = "de8f47b1";

const SelectedMovie = ({ movieID, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === movieID
  )?.userRating;

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieID);

  function handleAdd() {
    const newWatchMovie = {
      imdbID: movieID,
      title,
      year,
      userRating,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    onAddWatched(newWatchMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${movieID}`
      );
      const data = await res.json();
      // console.log(data);

      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [movieID]);

  useEffect(() => {
    if (!title) return;
    document.title = ` Movie | ${title}`;
    return function () {
      document.title = "usePopCorn";
      //console.log(`Clean up effect for movie`);
    };
  }, [title]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
        console.log("evaluation number 1");
      }
    }
    document.addEventListener("keydown", callback);
    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details" key={movieID}>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of the ${movie}}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime} &bull; {year}
              </p>
              <p>{genre}</p>
              <p>🌟{imdbRating}</p>
            </div>
          </header>
          <section>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring{actors}</p>
            <p>Director by {director}</p>
            {!isWatched ? (
              <div className=" rating">
                <StarRating
                  size={23}
                  maxRating={10}
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to List
                  </button>
                )}
              </div>
            ) : (
              <p>
                You rated this Movie! <span>⭐️ </span> {watchedUserRating}
              </p>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default SelectedMovie;
