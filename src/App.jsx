import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import Movie from "./pages/movie"
function App() {
 

  return (
    <>
   <Router>
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/Movie/:id" element={<Movie/>}/>
 
   </Routes>
   </Router>
    </>
  )
}

export default App
