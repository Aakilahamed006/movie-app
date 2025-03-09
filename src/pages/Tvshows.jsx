import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Tvshows = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [key, setKey] = useState(null);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=a5921546144266590baacf22b68f4287`)
            .then((res) => res.json())
            .then((json) => setMovie(json))
            .catch((error) => console.error("Error fetching movie details", error));
    }, [id]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=a5921546144266590baacf22b68f4287`)
            .then((res) => res.json())
            .then((json) => setKey(json.results))
            .catch((error) => console.error("Error fetching the key", error));
    }, [id]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=a5921546144266590baacf22b68f4287`)
            .then((res) => res.json())
            .then((json) => setActors(json.cast))
            .catch((error) => console.error("Error fetching the key", error));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="tvshow-container">
            <h1 className="movie-title">{movie.name}</h1>

            {key && key.length > 0 ? (
                <div className="trailer-container">
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

            <p className="ratings">⭐ Ratings: {movie.vote_average}</p>
            <p className="release-date">📅 Release Date: {movie.first_air_date}</p>

            <h2 className="overview-heading">Overview</h2>
            <p className="movie-overview">{movie.overview}</p>

            <h2 className="cast-heading">Cast</h2>
            {actors && actors.length > 0 ? (
                <ul className="actors-list">
                    {actors.slice(0, 5).map((actor) => (
                        <li key={actor.id} className="actor-item">
                            <img
                                className="actor-image"
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={actor.name}
                            />
                            <p className="actor-name">
                                {actor.name} as <span className="actor-character">{actor.character}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-actors">No cast information available</p>
            )}
        </div>
    );
};

export default Tvshows;
