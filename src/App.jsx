import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import Movie from "./pages/movie"
import Tvshows from "./pages/Tvshows";
function App() {
 

  return (
    <>
   <Router>
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/Movie/:id" element={<Movie/>}/>
   <Route path="/Tvshows/:id" element={<Tvshows/>}/>
 
   </Routes>
   </Router>
    </>
  )
}

export default App
