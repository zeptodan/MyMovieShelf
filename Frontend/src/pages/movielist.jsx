import SideNav from "../components/sidenav";
import Footer from "../components/footer";
const MovieList = () => {
  return (
    <>
      <div className="flex w-full h-full p-4">
        <main className="w-full md:w-3/4">
          <h1 className="text-3xl mt-8 ml-8 font-bold">Movie List</h1>
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