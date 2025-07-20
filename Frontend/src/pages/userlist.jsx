import SideNav from "../components/sidenav";
import Footer from "../components/footer";
import api from "../utilities/api";
import { useNavigate,useParams,useSearchParams } from "react-router-dom";
import {useAuth} from "../contexts/authProvider";
import { useNotification } from "../contexts/notificationProvider";
import useFetch from "../hooks/useFetch";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState,useEffect } from "react";
import {Link} from "react-router-dom";
const UserList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {paramtype} = useParams();
  const { addNotification } = useNotification();
  const { isAuthenticated, user, loading } = useAuth();
  const type = paramtype || "watchlist";
  const page = searchParams.get("page") || 1;
  const [rating, setRating] = useState("");
  const { data: movies, error } = useFetch(`/user/list?type=${type}&page=${page}`);
  useEffect(() => {
    if (!isAuthenticated) {
      if (loading) return;
      navigate("/login");
    }
    if (type !== "watchlist" && type !== "completed") {
      navigate("/userlist/watchlist");
    }
  }, [isAuthenticated]);
  if ((!isAuthenticated || (type !== "watchlist" && type !== "completed")) && loading) {
    return null;
  }
  if (!isAuthenticated && !loading) {
    return navigate("/login");
  }
  const handleAddToList = async(e) =>{
    e.stopPropagation();
    if (!isAuthenticated) {
        navigate("/login");
    }
    const type = e.currentTarget.id;
    const id = e.currentTarget.parentElement.parentElement.id;
    try {
        const res = await api.post('/user/list', { id, type })
        addNotification(res.data.msg || "Failed to add movie to list");
    } catch (error) {
        console.error(`Failed to add movie ${id} to ${type} list:`, error);
        addNotification("Failed to add movie to list");
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.currentTarget.parentElement.parentElement.id;
    if (rating < 1 || rating > 10) {
      addNotification("Rating must be between 1 and 10");
      return;
    }
    try {
      const res = await api.put('/user/list', { id, rating });
      addNotification(res.data.msg || "Rating submitted successfully");
    } catch (error) {
      console.error(`Failed to submit rating for movie ${id}:`, error);
      addNotification("Failed to submit rating");
    }
  }
  return (
    <>
      <div className="flex w-full h-full p-4">
        <main className="w-full md:w-3/4">
          <div className="flex justify-center items-center my-6 space-x-4">
            <Link to="/userlist/watchlist" className={` hover:text-crimsonRed text-xl font-medium ${type==="watchlist" ? "border-b-2 font-bold" : ""}`}>watchlist</Link>
            <Link to="/userlist/completed" className={` hover:text-crimsonRed text-xl font-medium ${type==="completed" ? "border-b-2 font-bold" : ""}`}>completed</Link>
          </div>
          {error ? <p className="text-red-500 text-center mt-8">Error: {error}</p> :
            <h1 className="text-3xl mt-8 ml-8 font-bold">{user}'s {type==="watchlist" ? "Watchlist" : "Completed Movies"}</h1>
          }
          <div className="flex flex-col">
            {movies && movies?.list?.length > 0 ? movies?.list?.map((movie, index) => (
              <div key={index} className="flex items-center justify-between p-4 mr-4 border-b border-gray-300">
                <div id={movie.id} className="flex w-full flex-col items-center sm:flex-row">
                  <img src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt={movie.title} className="w-32 h-48 sm:w-16 sm:h-24 rounded" />
                  <div className="ml-4 flex flex-col items-center sm:items-start">
                    <Link to={`/movie/${movie.id}`} className="text-xl font-semibold text-center hover:text-crimsonRed">{movie.title}</Link>
                    <p className="text-sm text-gray-500">{movie.release_date.slice(0, 4)}</p>
                    <p className="text-sm text-gray-500">{movie.original_language}</p>
                    <p className="text-sm text-gray-500">Rating: {movie.vote_average} / 10</p>
                    {type === "completed" && (
                      <p className="text-sm text-gray-500">Personal Rating: {movie.rating || "-"} / 10</p>
                    )}
                  </div>
                  <div className="justify-self-end sm:ml-auto mt-4 self-center">
                    {type === "completed" && (
                    <form onSubmit={handleSubmit} className=" mb-2">
                      <select name="rating" value={rating} onChange={(e) => setRating(e.target.value)} required className="mr-2 py-2 bg-darkBlue border border-gray-300 rounded pr-1">
                        <option value="" disabled>Rate</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-950/80 cursor-pointer">Submit</button>
                    </form>
                    )
                    }
                    <button id={type === "watchlist" ? "completed" : "watchlist"} onClick={handleAddToList} className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-950/80 cursor-pointer">Add to {type === "watchlist" ? "completed" : "watchlist"}</button>
                  </div>
                </div>
              </div>
            )) : 
            <p className="text-gray-500 text-center mt-8 text-2xl">Wow! So empty.</p>}
          </div>
          <div className="flex justify-center items-center space-x-4 mt-8 mb-4 w-full">
            <a className="w-12 h-12 flex justify-center items-center rounded-full bg-blue-950 hover:text-crimsonRed" href={`/userlist/${type}?page=1`}>
              <FaChevronLeft />
            </a>
            {page - 1 > 0 &&
              <a className="w-12 h-12 flex justify-center items-center rounded-full bg-blue-950 hover:text-crimsonRed" href={`/userlist/${type}?page=${Number(page) - 1}`}>{Number(page)-1}</a>
            }
            <p className="w-12 h-12 flex justify-center items-center rounded-full bg-crimsonRed">{page}</p>
            {movies && page < movies.pages &&
              <a className="w-12 h-12 flex justify-center items-center rounded-full bg-blue-950 hover:text-crimsonRed" href={`/userlist/${type}?page=${Number(page) + 1}`}>{Number(page)+1}</a>
            }
            {movies && <a className="w-12 h-12 flex justify-center items-center rounded-full bg-blue-950 hover:text-crimsonRed" href={`/userlist/${type}?page=${movies.pages}`}>
              <FaChevronRight />
            </a>}
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
export default UserList;