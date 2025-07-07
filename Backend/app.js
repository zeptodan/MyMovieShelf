import express from "express"
import dotenv from "dotenv"
import connect from "./database/connect.js"
import User from "./models/user.js"
import axios from "axios"
import bcrypt from "bcryptjs"
import cookieParser from "cookie-parser"
const base = 'https://api.themoviedb.org/3'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())


app.post("/api/signup",async (req,res)=>{
    const {name,password} = req.body;
    if (!name){
        return res.json({success:false,msg:"No Name provided"})
    }
    if (!password){
        return res.json({success:false,msg:"No Password provided"})
    }
    const isUser = await User.findOne({name:name})
    if(isUser){
        return res.json({success:false,msg:"Name already taken"})
    }
    User.create(req.body)
    return res.json({success:true,msg:"user created"})
})
app.post("/api/login",async (req,res)=>{
    const {name,password} = req.body;
    if (!name){
        return res.json({success:false,msg:"No Name provided"})
    }
    if (!password){
        return res.json({success:false,msg:"No Password provided"})
    }
    const thisUser = await User.findOne({name:name})
    if(!thisUser){
        return res.json({success:false,msg:"Invalid name"})
    }
    if (!(await bcrypt.compare(password,thisUser.password))){
        return res.json({success:false,msg:"Invalid password"})
    }
    jwt=thisUser.createJWT()
    res.cookie("token",jwt,{httpOnly:true})
    return res.json({success:true,msg:"user logged in"})
})
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
