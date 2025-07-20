import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";
import { useEffect } from "react";
import { useNotification } from "../contexts/notificationProvider";
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {addNotification} = useNotification();
    const { message } = location.state || {};
    useEffect(() => {
        if (message) {
            addNotification(message);
        }
    }, []);
    const { login,isAuthenticated,error } = useAuth();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const username = e.target.name.value;
        const password = e.target.password.value;
        await login({ name: username, password });
        // Handle login logic here
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-darkBlue text-white">
        <div className="w-screen h-screen sm:h-auto sm:w-md rounded-md bg-blue-950 p-6 shadow-lg flex flex-col items-center justify-around sm:justify-start px-8">
            <h1 className="w-full text-center text-2xl font-medium mb-8">WELCOME BACK!</h1>
            <form className="w-full flex flex-col mb-4" onSubmit={handleSubmit}>
                <label htmlFor="name" className="block mb-2">
                USERNAME:
                </label>
                <input className="bg-white rounded-sm text-black px-2 h-8" type="text" name="name" id="name" placeholder="Username"/>
                <br />
                <label htmlFor="password" className="block mb-2">
                PASSWORD:
                </label>
                <input className="bg-white rounded-sm text-black px-2 h-8" type="password" name="password" id="password" placeholder="Password"/>
                <br />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="bg-darkBlue rounded-sm py-2 my-2 hover:bg-crimsonRed transition-colors duration-300">Login</button>
            </form>
            <p className="text-center">Don't have an account? Register <a className="text-crimsonRed font-semibold" href="/register">Here</a></p>
            <a href="/" className="mt-2 text-center hover:text-crimsonRed">Go Home</a>
        </div>
    </div>
  );
}
export default Login;