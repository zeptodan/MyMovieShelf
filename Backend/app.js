import express from "express"
import dotenv from "dotenv"
import connect from "./database/connect.js"
import axios from "axios"
import cookieParser from "cookie-parser"
import { signup,login } from "./controllers/LoginSignup.js"
const base = 'https://api.themoviedb.org/3'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())


app.post("/api/signup",signup)
app.post("/api/login",login)
app.get("/api/movies",async(req,res)=>{
    const movies = await axios.get(`${base}/movie/popular`,{
        params: {api_key:process.env.TMDB_KEY}
    })
    res.json(movies.data)
})


const start = async ()=>{
    try {
        await connect(process.env.MONGODB_URI);
        app.listen(5000,()=>{
            console.log("listening to port 5000")
        })
     
    } catch (error) {
        console.log(error)
    }
}
start()
