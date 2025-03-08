import React from "react"
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
const Movie=()=>{
    const {id}=useParams();
    const[movie,setMovie]=useState(null);
    const [key, setKey] = useState(null);;
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a5921546144266590baacf22b68f4287`)
        .then((res)=>res.json())
        .then((json)=>setMovie(json))
        .catch((error)=>console.error("Error fetching movie details",error))
    },[id])

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=a5921546144266590baacf22b68f4287`)
        .then((res)=>res.json())
        .then((json)=>setKey(json.results))
        .catch((error)=>console.error("error fetching the key",error))
    },[id])
    if (!movie) return <p>Loading...</p>;
return(
    <>
            <h1>{movie.title}</h1>
        
           {key && key.length > 0 ? (
                <div>
                    <h2>Watch Trailer</h2>
                    <iframe
                        width="1500"
                        height="600"
                        src={`https://www.youtube.com/embed/${key[0].key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                        <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <h2>{movie.overview}</h2>
                </div>
            ) : (
                <p>No trailer available</p>
            )}
        </>
   
)


}
export default Movie