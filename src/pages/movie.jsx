import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Tvshows.css';  // Import the CSS file for styling

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [key, setKey] = useState(null);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a5921546144266590baacf22b68f4287`)
      .then((res) => res.json())
      .then((json) => setMovie(json))
      .catch((error) => console.error("Error fetching movie details", error));
  }, [id]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=a5921546144266590baacf22b68f4287`)
      .then((res) => res.json())
      .then((json) => setKey(json.results))
      .catch((error) => console.error("error fetching the key", error));
  }, [id]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=a5921546144266590baacf22b68f4287`)
      .then((res) => res.json())
      .then((json) => setActors(json.cast))
      .catch((error) => console.error("error fetching the key", error));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-container">
      <h1 className="movie-title">{movie.title}</h1>

      <div className="trailer-container">
        {key && key.length > 0 ? (
          <div>
            <h2 className="trailer-heading">Watch Trailer</h2>
            <iframe
              className="trailer-video"
              width="1500"
              height="600"
              src={`https://www.youtube.com/embed/${key[0].key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="no-trailer">No trailer available</p>
        )}
      </div>

      <p className="ratings">⭐ Ratings: {movie.vote_average}</p>
      <p className="release-date">📅 Release Date: {movie.release_date}</p>

      <h2 className="overview-heading">Overview</h2>
      <p className="movie-overview">{movie.overview}</p>

      <div className="cast-section">
        <h3 className="cast-heading">Cast</h3>
        {actors && actors.length > 0 ? (
          <ul className="actors-list">
            {actors.slice(0, 5).map((actor) => (
              <li key={actor.id} className="actor-item">
                <img
                  className="actor-image"
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
                <p className="actor-name">{actor.name}</p>
                <p className="actor-character">{actor.character}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-actors">No cast information available</p>
        )}
      </div>
    </div>
  );
};

export default Movie;
