import {useState,useEffect} from 'react';
import {FaSearch} from 'react-icons/fa';
import { useAuth } from '../contexts/authProvider';
import { FaUser,FaBars } from 'react-icons/fa';
import {genres} from '../utilities/genres';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated,logout,user } = useAuth();
    useEffect(() => {
        if (isMobileMenuOpen) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isMobileMenuOpen]);
    const handleLogout = async() => {
        await logout();
        window.location.href = '/';
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = e.target.query.value;
        if (query) {
            window.location.href = `/movielist/search?query=${query}`;
        }
    };
    return (
        <nav className='relative w-screen h-16 bg-blue-950 text-white flex items-center justify-between px-4 shadow-2xl border-b border-darkBlue z-40'>
            <a href='/' className='text-2xl md:text-3xl text-crimsonRed'>My Movie Shelf</a>
            <form onSubmit={handleSearchSubmit} className='h-8 flex items-center bg-white rounded-full overflow-hidden w-1/3'>
                <input className=" pl-4 h-full border-r-2 border-gray-700 text-black w-full" type="text" name="query" placeholder="Search" />
                <button className='h-full w-12 flex justify-center items-center'><FaSearch color='black' /></button>
            </form>
            <div className='flex space-x-4'>
                {isAuthenticated ? 
                    <div className='relative mr-4 md:mr-12' onMouseEnter={()=> window.innerWidth > 768 && setIsOpen(true)} onMouseLeave={()=> window.innerWidth > 768 && setIsOpen(false)}>
                        <button className='w-8 aspect-square' onClick={() => setIsOpen(!isOpen)}>
                            <FaUser className='w-8 h-8' />
                        </button>
                        {isOpen && <div className='absolute flex flex-col items-center bg-blue-950 rounded-b-sm p-4 right-1/2 translate-x-1/2 space-y-2 shadow-lg z-50 border border-darkBlue border-t-0'>
                            <p className='font-bold'>{user}</p>
                            <Link to="/userlist/watchlist" className=' hover:text-crimsonRed'>Watchlist</Link>
                            <Link to="/userlist/completed" className=' hover:text-crimsonRed'>Completed</Link>
                            <button className='bg-crimsonRed rounded-sm px-4 py-2 hover:bg-red-900' onClick={handleLogout}>Logout</button>
                        </div>}
                    </div> : 
                    <a href="/login" className='bg-crimsonRed rounded-sm px-4 py-2 hover:bg-red-900'>Login</a>
                }
                <button className='w-8 h-8 block md:hidden' onClick={()=> setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <FaBars className='w-8 h-8 text-white' />
                </button>
            </div>
            <div className='fixed h-screen w-1/2 overflow-hidden bg-blue-950 top-16 right-0 z-10 transition-transform duration-300 ease-in-out' style={{transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)'}}>
                <div className='flex flex-col items-center h-full space-y-4 p-4'>
                    <a href="/movielist/popular" className='text-2xl lg:text-3xl font-bold my-4 hover:text-crimsonRed'>Popular</a>
                    <a href="/movielist/top_rated" className='text-2xl lg:text-3xl font-bold my-4 hover:text-crimsonRed'>Top Rated</a>
                    <h2 className='text-xl lg:text-2xl font-bold my-4'>Genres</h2>
                    <ul className='lg:text-xl gap-4 grid grid-cols-2 my-2'>
                        {genres.map((genre) => (
                            <li key={genre.id} className="flex justify-center">
                                <a href={`/movielist/${genre.id}`} className='hover:text-crimsonRed text-center'>{genre.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;