import React, { useEffect, useState } from "react";
import './moviestyle.css'; // Import the CSS file

const RatedMovie = () => {
  const [movies, setMovies] = useState([]);

  const getMovie = () => {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=a5921546144266590baacf22b68f4287")
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <div className="category">
        <h1>Top Rated Movies</h1>
        <div className="movie-row">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <p><strong>Rating:</strong> {movie.vote_average}</p>
              {/* Overview shown on hover */}
              <div className="overview">
                <strong>Overview:</strong> {movie.overview}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RatedMovie;
