import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Carousel = ({movielist})=>{
    const carouselRef = useRef(null);
    const imgBase = import.meta.env.VITE_IMG_BASE || "https://image.tmdb.org/t/p/";
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id
        navigate(`/movie/${id}`);
    }
    return (
        <div className="w-full overflow-x-hidden px-4 relative">
            <button className="absolute left-8 top-1/4  z-10 bg-black rounded-full p-2 opacity-60 hover:opacity-100 transition-opacity" onClick={() => {
                    carouselRef.current.scrollBy({ left: -500, behavior: 'smooth' });
                }}>
                <FaChevronLeft className="w-8 h-8 text-gray-500" />
            </button>
            <div ref={carouselRef} className="w-full carousel overflow-x-auto flex space-x-4">
                {movielist && movielist.map((movie, index) => (
                    <div key={index} className="flex-shrink-0 w-48 h-96 rounded-lg shadow-md">
                        <div onClick={handleClick} id={movie.id} className="relative w-full h-72 group cursor-pointer">
                            <img src={`${imgBase}/w342/${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover rounded-t-lg" />
                            <div className="absolute inset-0 w-full h-full bg-darkBlue opacity-0 z-10 group-hover:opacity-50 transition-opacity"></div>
                        </div>
                        <a onClick={handleClick} id={movie.id} className="font-semibold text-sm m-2 mb-1 hover:text-crimsonRed cursor-pointer">{movie.title}</a>
                        <div className="flex justify-between mx-2">
                            <p className="text-sm text-gray-500 border border-gray-500 px-2">{movie.release_date.slice(0,4)}</p>
                            <p className="text-sm text-gray-500">{movie.original_language.charAt(0).toUpperCase() +movie.original_language.slice(1)}</p>
                            <p className="text-sm text-gray-500">{Math.round(movie.vote_average * 10) / 10}/10</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="absolute right-8 top-1/4 z-10 bg-black rounded-full p-2 opacity-60 hover:opacity-100 transition-opacity" onClick={() => {
                    carouselRef.current.scrollBy({ left: 500, behavior: 'smooth' });
                }}>
                <FaChevronRight className="w-8 h-8 text-gray-500"/>
            </button>
        </div>
    );
}
export default Carousel;