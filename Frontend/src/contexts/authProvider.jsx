import { createContext,useState,useEffect, useContext } from "react";
import api from "../utilities/api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const response = await api.get('/user/auth');
                if (response.data.success) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                setIsAuthenticated(false);
            }
            finally {
                setLoading(false);
            }
        };
        checkAuth();
    },[])
    const login = async(userData) => {
        const data = await api.post('/login', userData);
        if (data.data.success) {
        // Assuming the response contains user data
            setUser(userData.name);
            setIsAuthenticated(true);
        }
        else {
            setError(data.data.msg);
        }
    };

    const logout = async() => {
        const data = await api.get('/user/logout');
        if (data.data.success) {
        // Clear user data on logout
            setUser(null);
            setIsAuthenticated(false);
        }
        else{
            setError(data.data.msg);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout,error,loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);