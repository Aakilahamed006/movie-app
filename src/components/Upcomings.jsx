import React, { useEffect, useState } from "react";
import './moviestyle.css';
import { Navigate, useNavigate } from "react-router-dom";
const Upcomings = () => {
  const [shows, setShows] = useState([]);
  const navigate=useNavigate()
  const getShows = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=a5921546144266590baacf22b68f4287"
      );
      const json = await response.json();

      if (json.results) {
        setShows(json.results);
      } else {
        console.error("Unexpected API response:", json);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <div className="category">
      <h1>Upcomings</h1>
      <div className="movie-row">
        {shows.length > 0 ? (
          shows.map((show) => (
            <div key={show.id} className="movie-card">
              {show.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                />
               
              ) : (
                <div className="placeholder">No Image Available</div>
              )}
              <h2>{show.name}</h2>
              <button onClick={()=>{navigate(`/movie/${show.id}`)}}>click to play </button>
              <p><strong>Rating:</strong> {show.vote_average}</p>
              
            </div>
          ))
        ) : (
          <p>Loading TV shows...</p>
        )}
      </div>
    </div>
  );
};

export default Upcomings;
