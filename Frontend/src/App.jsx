import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import MovieList from "./pages/movielist";
import UserList from "./pages/userlist";
import Register from "./pages/register";
import Login from "./pages/login";
import SingleMovie from "./pages/singlemovie";
function AppLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  return (
    <>
      {!(hideNavbarRoutes.includes(location.pathname)) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movielist/:paramtype" element={<MovieList/>} />
        <Route path="/userlist/:type" element={<UserList/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/movie/:id" element={<SingleMovie/>} />
        <Route path="*" element={<div className="flex flex-col justify-center items-center h-screen w-screen"><p className="text-5xl">😢404 Not Found</p><a href="/" className="text-2xl mt-4 p-4 bg-crimsonRed text-white rounded">Go Home</a></div>} />
      </Routes>
    </>
  )
}
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App
