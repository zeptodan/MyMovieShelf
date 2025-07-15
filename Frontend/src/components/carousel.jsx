import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "./card";
const Carousel = ({movielist})=>{
    const carouselRef = useRef(null);
    return (
        <div className="w-full overflow-x-hidden px-4 relative">
            <button className="absolute left-8 top-1/4  z-10 bg-black rounded-full p-2 opacity-60 hover:opacity-100 transition-opacity" onClick={() => {
                    carouselRef.current.scrollBy({ left: -500, behavior: 'smooth' });
                }}>
                <FaChevronLeft className="w-8 h-8 text-gray-500" />
            </button>
            <div ref={carouselRef} className="w-full carousel overflow-x-auto flex space-x-4">
                {movielist && movielist.map((movie, index) => (
                    <Card key={index} movie={movie} />
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