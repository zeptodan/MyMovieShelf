import SideNav from "../components/sidenav";
import Footer from "../components/footer";
import api from "../utilities/api";
import { useNavigate,useParams,useSearchParams } from "react-router-dom";
import {useAuth} from "../contexts/authProvider";
import { useNotification } from "../contexts/notificationProvider";
import useFetch from "../hooks/useFetch";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect } from "react";
const UserList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {paramtype} = useParams();
  const { addNotification } = useNotification();
  const { isAuthenticated, user, loading } = useAuth();
  const type = paramtype || "watchlist";
  const page = searchParams.get("page") || 1;
  const { data: movies, error } = useFetch(`/user/list?type=${type}&page=${page}`);
  useEffect(() => {
    if (!isAuthenticated) {
      console.log(isAuthenticated,user)
      if (loading) return;
      navigate("/login");
    }
    if (type !== "watchlist" && type !== "completed") {
      navigate("/userlist/watchlist");
    }
  }, [isAuthenticated]);
  if (!isAuthenticated || (type !== "watchlist" && type !== "completed") || loading) {
    return null;
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
  return (
    <>
      <div className="flex w-full h-full p-4">
        <main className="w-full md:w-3/4">
          {error ? <p className="text-red-500 text-center mt-8">Error: {error}</p> :
            <h1 className="text-3xl mt-8 ml-8 font-bold">{user}'s {type==="watchlist" ? "Watchlist" : "Completed Movies"}</h1>
          }
          <div className="flex flex-col">
            {movies ? movies?.list?.map((movie, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b border-gray-300">
                <div className="flex items-center">
                  <img src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt={movie.title} className="w-16 h-24 rounded" />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                    <p className="text-sm text-gray-500">{movie.release_date.slice(0, 4)}</p>
                  </div>
                  <div className="ml-4">
                    <button id="watchlist" onClick={handleAddToList} className="bg-blue-950 text-white px-4 py-2 rounded">Add to Watchlist</button>
                    <button id="completed" onClick={handleAddToList} className="bg-blue-950 text-white px-4 py-2 rounded">Mark as Completed</button>
                  </div>
                </div>
              </div>
            )) : 
            <p className="text-gray-500 text-center mt-8">No movies found.</p>}
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