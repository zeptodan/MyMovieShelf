import express from "express"
import dotenv from "dotenv"
import connect from "./database/connect.js"
import cookieParser from "cookie-parser"
import { signup,login } from "./controllers/LoginSignup.js"
import movieRouter from "./routes/moviesRoute.js"
import userRouter from "./routes/userRoute.js"
import auth from "./middleware/auth.js"
import errorHandler from "./middleware/errorHandler.js"
import notFound from "./middleware/notFound.js"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.post("/api/signup",signup)
app.post("/api/login",login)

app.use("/api/movies",movieRouter)
app.use("/api/user",auth,userRouter)
app.use(notFound)
app.use(errorHandler)

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
