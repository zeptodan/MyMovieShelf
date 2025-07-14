import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import { useAuth } from '../contexts/authProvider';
import { FaUser,FaBars } from 'react-icons/fa';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const handleLogout = () => {
        // Logic for logging out the user
        console.log("User logged out");
    };
    return (
        <nav className='relative w-screen h-16 bg-blue-950 text-white flex items-center justify-between px-4 shadow-2xl border-b border-darkBlue z-50'>
            <h1 className='text-2xl md:text-3xl text-crimsonRed'>My Movie Shelf</h1>
            <div className='h-8 flex items-center bg-white rounded-full overflow-hidden w-1/3'>
                <input className=" pl-4 h-full border-r-2 border-gray-700 text-black w-full" type="text" name="search" placeholder="Search" />
                <button className='h-full w-12 flex justify-center items-center'><FaSearch color='black' /></button>
            </div>
            <div className='flex space-x-4'>
                {isAuthenticated ? 
                    <div className='relative mr-4 md:mr-12' onMouseEnter={()=> window.innerWidth > 768 && setIsOpen(true)} onMouseLeave={()=> window.innerWidth > 768 && setIsOpen(false)}>
                        <button className='w-8 aspect-square' onClick={() => setIsOpen(!isOpen)}>
                            <FaUser className='w-8 h-8' />
                        </button>
                        {isOpen && <div className='absolute flex flex-col items-center bg-blue-950 rounded-b-sm p-4 right-1/2 translate-x-1/2 space-y-2 shadow-lg z-50'>
                            <a href="/userlist/watchlist" className=' hover:text-crimsonRed'>Watchlist</a>
                            <a href="/userlist/completed" className=' hover:text-crimsonRed'>Profile</a>
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

            </div>
        </nav>
    );
}
export default Navbar;