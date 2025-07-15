import { useEffect,useState } from "react";
import api from "../utilities/api";
import Carousel from "../components/carousel";
import SideNav from "../components/sidenav";
import Footer from "../components/footer";
const Home = () => {
  const [movies, setMovies] = useState({});
  useEffect(() => {
    const getHome = async () => {
      try {
        const res = await api.get("/movies/home");
        setMovies(res.data);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      }
    }
    getHome();
  }, []);
  return (
    <>
      <div className="flex w-full h-full p-4">
        <main className="w-full md:w-3/4">
          <h1 className="text-3xl mt-8 ml-8 font-bold">Welcome to My Movie Shelf</h1>
          <p className="text-xl ml-12 pt-2 mb-8">Your personal movie collection awaits!</p>
          <div className="flex justify-between items-center mx-4 mb-2 pb-2 border-b border-gray-300">
            <h2 className="text-2xl ml-2 font-bold">Popular Movies</h2>
            <a href="/movielist/popular" className="hover:text-crimsonRed text-xl">View More</a>
          </div>
          <Carousel movielist={movies.popular} />
          <div className="flex justify-between items-center mx-4 mb-2 pb-2 border-b border-gray-300">
            <h2 className="text-2xl ml-2 font-bold">Top Rated Movies</h2>
            <a href="/movielist/top_rated" className="hover:text-crimsonRed text-xl">View More</a>
          </div>
          <Carousel movielist={movies.top_rated} />
          <div className="flex justify-between items-center mx-4 mb-2 pb-2 border-b border-gray-300">
            <h2 className="text-2xl ml-2 font-bold">Watchlist</h2>
            <a href="/userlist/watchlist" className="hover:text-crimsonRed text-xl">View More</a>
          </div>
          {movies.watchlist && movies.watchlist.length > 0 ? <Carousel movielist={movies.watchlist} /> :
          <div className="w-full h-52 flex items-center justify-center">
            <p className="text-xl">WOW! So Empty</p>
          </div>
          }
        </main>
        <aside className="w-1/4 hidden md:block">
          <SideNav />
        </aside>
      </div>
      <Footer />
    </>
  );
}
export default Home;