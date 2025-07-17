import { useNavigate } from "react-router-dom";
import api from "../utilities/api";
import {FaPlus,FaCheck} from "react-icons/fa";
const Card = ({movie }) => {
    const imgBase = import.meta.env.VITE_IMG_BASE || "https://image.tmdb.org/t/p/";
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id
        navigate(`/movie/${id}`);
    }
    const handleAddToList = async(e) =>{
        e.stopPropagation();
        const type = e.currentTarget.id;
        const id = e.currentTarget.parentElement.parentElement.id;
        const res = await api.post('/user/list', { id, type })
        if (res.status !== 200 || res.data.success === false) {
            // Logic to add movie to watchlist
            console.log(`Adding movie ${id} to ${type} list ${res.data.msg}`);
        } else {
            // Logic to add movie to watched list
            console.log(`Adding movie ${id} to watched list`);
        }
    }
    return (
        <div className="flex-shrink-0 w-48 h-96 rounded-lg shadow-md">
            <div onClick={handleClick} id={movie.id} className="relative w-full h-72 group cursor-pointer">
                <img src={`${imgBase}/w342/${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover rounded-t-lg" />
                <div className="absolute inset-0 w-full h-full bg-darkBlue opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="absolute right-0 bottom-0 flex flex-col">
                    <button onClick={handleAddToList} id="watchlist" className="relative opacity-50 hover:opacity-100 hover:text-crimsonRed p-2 bg-black after:content-['watchlist'] after:opacity-0 after:absolute hover:after:opacity-100 after:pointer-events-none after:text-white after:bg-black/50 after:left-1/2 after:transform after:-translate-x-1/2 after:-top-10 after:p-2 after:rounded-xl after:z-10"><FaPlus/></button>
                    <button onClick={handleAddToList} id="completed" className="relative opacity-50 hover:opacity-100 hover:text-crimsonRed p-2 bg-black after:content-['completed'] after:opacity-0 after:absolute hover:after:opacity-100 after:pointer-events-none after:text-white after:bg-black/50 after:left-1/2 after:transform after:-translate-x-1/2 after:-top-10 after:p-2 after:rounded-xl after:z-10"><FaCheck/></button>
                </div>
            </div>
            <a onClick={handleClick} id={movie.id} className="font-semibold text-sm m-2 mb-1 hover:text-crimsonRed cursor-pointer">{movie.title}</a>
            <div className="flex justify-between mx-2">
                <p className="text-sm text-gray-500 border border-gray-500 px-2">{movie.release_date.slice(0,4)}</p>
                <p className="text-sm text-gray-500">{movie.original_language.charAt(0).toUpperCase() +movie.original_language.slice(1)}</p>
                <p className="text-sm text-gray-500">{Math.round(movie.vote_average * 10) / 10}/10</p>
            </div>
        </div>
    )
}
export default Card;