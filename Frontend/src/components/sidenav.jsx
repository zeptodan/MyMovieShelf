import { genres } from "../utilities/genres";
const SideNav = () => {
    return (
        <div className="w-full p-4 rounded-lg bg-blue-950 flex flex-col items-center">
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
    );
}
export default SideNav;