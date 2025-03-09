import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const searchShows = async () => {
    if (search.length === 0) {
      setSearchResult([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=a5921546144266590baacf22b68f4287`
      );
      const json = await response.json();
      if (json.results) {
        setSearchResult(json.results);
      } else {
        console.log("ERROR");
        setSearchResult([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchShows();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="searchbar">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search for movies..."
          className="search-input"
        />
      </div>

      <div className="movie-row">
        {searchResult.length > 0 ? (
          searchResult.slice(0, 4).map((movie) => (
            <div key={movie.id} className="movie-card-container">
              <button
                className="movie-card-button"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className="movie-card">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="placeholder">No Image Available</div>
                  )}
                  <h2>{movie.title}</h2>
                 
                </div>
              </button>
              <p><strong>Rating:</strong> {movie.vote_average}</p>
            </div>
          ))
        ) : search.length > 0 ? (
          <p>No results found</p>
        ) : null}
      </div>
    </>
  );
};

export default Searchbar;
