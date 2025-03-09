import RatedMovie from '../components/movie'
import Tvshows from '../components/Tvshows'
import Popularshows from '../components/popular'
import Upcomings from '../components/Upcomings'
import Searchbar from '../components/Searchbar'
import '../components/moviestyle.css'
function Home() {
 

  return (
    <>
<h1 className='header'>MOVIE TIME</h1>



   <Searchbar/>
   <RatedMovie/>
   <Tvshows/>
   <Popularshows/>
   <Upcomings/>
   
    </>
  )
}

export default Home
