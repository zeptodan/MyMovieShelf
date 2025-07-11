import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import MovieList from "./pages/movielist";
import UserList from "./pages/userlist";
import Register from "./pages/register";
import Login from "./pages/login";
function AppLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  return (
    <>
      {!(hideNavbarRoutes.includes(location.pathname)) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movielist/:type" element={<MovieList/>} />
        <Route path="/userlist/:type" element={<UserList/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
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
