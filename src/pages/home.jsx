import RatedMovie from '../components/movie'
import Tvshows from '../components/Tvshows'
import Popularshows from '../components/popular'
import Upcomings from '../components/Upcomings'
import Searchbar from '../components/Searchbar'
function Home() {
 

  return (
    <>
   <Searchbar/>
   <RatedMovie/>
   <Tvshows/>
   <Popularshows/>
   <Upcomings/>
   
    </>
  )
}

export default Home
