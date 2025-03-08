import React from "react";
import { useEffect,useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Searchbar=()=>{
const [search,setSearch]=useState("")
const [searchResult,setSearchResult]=useState([])
  const navigate=useNavigate()
const searchShows = async()=>{
    try{
        const response=await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=a5921546144266590baacf22b68f4287`)

        const json =await response.json()
        if (json.results){
            setSearchResult(json.results)
        }
        else{
            console.log("ERROR")
        }
    }
    catch(error){
        console.error("Error fetching data:", error);
    }
}
  

const handleSubmit=(e)=>{
   e.preventDefault();
   
   searchShows();
   setSearch("");
    
}

const handleChange=(event)=>{
    setSearch(event.target.value);

}
    return(
        <>
        <>SEARCH </>
        <form onSubmit={handleSubmit}>
            <input type="text" value={search} onChange={handleChange} placeholder="what movie do you want to watch"></input>
            <button>Search</button>
        </form>
        <div className="result">
  {searchResult.length > 0 ? (
    searchResult.map((movie) => (
        
      <><img key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <button onClick={() => { navigate(`/movie/${movie.id}`); } }>click to play </button></>
     
      
    ))
  ) : (
    <p>no result found</p>
  )}
</div>

        </>
    )
}
export default Searchbar