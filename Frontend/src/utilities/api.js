import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // This is important for sending cookies with requests
});
export default api;