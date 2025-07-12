import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utilities/api";
const Register = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const username = e.target.name.value;
        const password = e.target.password.value;
        const res = await api.post('/signup', { name: username, password })
        if (res.data.success) {
            navigate("/login");
        }
        else {
            setError(res.data.msg);
        }
    };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-darkBlue text-white">
        <div className="w-screen h-screen sm:h-auto sm:w-md rounded-md bg-blue-950 p-6 shadow-lg flex flex-col items-center justify-around sm:justify-start px-8">
            <h1 className="w-full text-center text-2xl font-medium mb-8">REGISTER!</h1>
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
                <button type="submit" className="bg-darkBlue rounded-sm py-2 my-2">Register</button>
            </form>
            <p className="text-center">Already have an account? Login <a className="text-crimsonRed font-semibold" href="/login">Here</a></p>
        </div>
    </div>
  );
}
export default Register;