import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const RatedMovie = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

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
            <div key={movie.id} className="movie-card-container">
              <button
                className="movie-card-button"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h2>{movie.title}</h2>
                  
                </div>
              </button>
              <p><strong>Rating:</strong> {movie.vote_average}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RatedMovie;
