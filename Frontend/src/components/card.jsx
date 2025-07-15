import { useNavigate } from "react-router-dom";
const Card = ({movie }) => {
    const imgBase = import.meta.env.VITE_IMG_BASE || "https://image.tmdb.org/t/p/";
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id
        navigate(`/movie/${id}`);
    }
    return (
        <div className="flex-shrink-0 w-48 h-96 rounded-lg shadow-md">
            <div onClick={handleClick} id={movie.id} className="relative w-full h-72 group cursor-pointer">
                <img src={`${imgBase}/w342/${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover rounded-t-lg" />
                <div className="absolute inset-0 w-full h-full bg-darkBlue opacity-0 group-hover:opacity-50 transition-opacity"></div>
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