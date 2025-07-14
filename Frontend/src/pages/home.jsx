import { useEffect,useState } from "react";
import api from "../utilities/api";
import Carousel from "../components/carousel";
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
    <div className="w-full">
      <h1>Welcome to My Movie Shelf</h1>
      <p>Your personal movie collection awaits!</p>
      <Carousel movielist={movies.popular} />
      <Carousel movielist={movies.top_rated} />
    </div>
  );
}
export default Home;