import SideNav from "../components/sidenav";
import Footer from "../components/footer";
import { useParams,useSearchParams } from "react-router-dom";
import { genres } from "../utilities/genres";
import useFetch from "../hooks/useFetch";
import Card from "../components/card";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
const MovieList = () => {
  const { paramtype } = useParams();
  const [searchParams] = useSearchParams();
  let title;
  let url;
  const type = paramtype || "popular";
  const page = searchParams.get("page") || 1;
  const query = searchParams.get("query") || "";
  const genreName = genres.find(genre => genre.id === type)?.name;
  if (genreName) {
    title = `Genre: ${genreName}`;
    url = `/movies/genre?genre_id=${type}&page=${page}`;
  }
  else if (type === "popular") {
    title = "Popular Movies";
    url = `/movies/popular?page=${page}`;
  }
  else if (type === "top_rated") {
    title = "Top Rated Movies";
    url = `/movies/top_rated?page=${page}`;
  }
  else {
    title = `Search: ${query}`;
    url = `/movies/search?search=${query}&page=${page}`;
  }
  const { data: movies, error } = useFetch(url);
  return (
    <>
      <div className="flex w-full h-full p-4">
        <main className="w-full md:w-3/4">
          {error ? <p className="text-red-500 text-center mt-8">Error: {error}</p> :
            <h1 className="text-3xl mt-8 ml-8 font-bold">{title}</h1>
          }
          {movies && movies.results.length > 0 && 
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
              {movies.results.map((movie, index) => (
                <Card key={index} movie={movie} />
              ))}
            </div>}
          <div className="flex justify-center items-center space-x-4 mt-8 mb-4 w-full">
            <a className="w-12 h-12 flex justify-center items-center rounded-full bg-blue-950 hover:text-crimsonRed" href={`/movielist/${type}?page=1${type==="search"?`&query=${query}`:""}`}>
              <FaChevronLeft />
            </a>
            {page - 1 > 0 &&
              <a className="w-12 h-12 flex justify-center items-center rounded-full bg-blue-950 hover:text-crimsonRed" href={`/movielist/${type}?page=${Number(page) - 1}${type==="search"?`&query=${query}`:""}`}>{Number(page)-1}</a>
            }
            <p className="w-12 h-12 flex justify-center items-center rounded-full bg-crimsonRed">{page}</p>
            {movies && page < Math.min(movies.total_pages,500) &&
              <a className="w-12 h-12 flex justify-center items-center rounded-full bg-blue-950 hover:text-crimsonRed" href={`/movielist/${type}?page=${Number(page) + 1}${type==="search"?`&query=${query}`:""}`}>{Number(page)+1}</a>
            }
            {movies && <a className="w-12 h-12 flex justify-center items-center rounded-full bg-blue-950 hover:text-crimsonRed" href={`/movielist/${type}?page=${Math.min(movies.total_pages,500)}${type==="search"?`&query=${query}`:""}`}>
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
export default MovieList;