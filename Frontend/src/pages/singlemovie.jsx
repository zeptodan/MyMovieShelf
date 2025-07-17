import SideNav from "../components/sidenav";
import Footer from "../components/footer";
import api from "../utilities/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authProvider";
const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const handleAddToList = async (e) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const type = e.currentTarget.id;
    try {
      const res = await api.post('/user/list', { id, type });
      if (res.status === 200 && res.data.success) {
        console.log(`Movie ${id} added to ${type} list successfully.`);
      }
    } catch (error) {
      console.error(`Failed to add movie ${id} to ${type} list:`, error);
    }
  };
  const handleRemoveFromList = async (e) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const res = await api.delete(`/user/${id}`);
    if (res.status === 200 && res.data.success) {
      console.log(`Movie ${id} removed from list successfully.`);
    } else {
      console.error(`Failed to remove movie ${id} from list:`, res.data.msg);
    }
  }
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await api.get(`/movies/${id}`);
      setMovie(res.data);
    };
    fetchMovie();
  }, [id]);
  if (!movie) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }
  return (
    <>
      <div className="flex w-full h-full p-4">
        <main className="w-full md:w-3/4">
          <div className="flex flex-col lg:flex-row items-center md:items-start gap-4">
            <img src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt={movie.title} />
            <div className="m-2">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="my-4 font-light">{movie.overview}</p>
              <div className="flex flex-col space-y-2 my-6 text-gray-500">
                <p>Genres: {movie.genres.map(genre => genre.name).join(", ")}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Language: {movie.original_language.toUpperCase()}</p>
                <p>Rating: {Math.round(movie.vote_average * 10) / 10}/10</p>
                <p>Runtime: {movie.runtime} minutes</p>
              </div>
              <div className="flex space-x-2 mt-4">
                <button id="watchlist" onClick={handleAddToList} className="px-2 sm:px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-500/80 cursor-pointer">
                  Add to watchlist
                </button>
                <button id="completed" onClick={handleAddToList} className="px-2 sm:px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-950/80 cursor-pointer">
                  Mark as Completed
                </button>
                <button onClick={handleRemoveFromList} className="px-2 sm:px-4 py-2 bg-crimsonRed text-white rounded hover:bg-crimsonRed/80 cursor-pointer">
                  Remove from list
                </button>
              </div>
            </div>
          </div>
        </main>
        <aside className="w-1/4 hidden md:block">
          <SideNav />
        </aside>
      </div>
      <Footer />
    </>
   );
 }
export default SingleMovie;