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
import helmet from "helmet"
import cors from "cors"
import xss from "xss-clean"
import rateLimiter from "express-rate-limit"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter({
    windowMs:15*60*1000,
    limit:100
}))

app.post("/api/signup",signup)
app.post("/api/login",login)

app.use("/api/movies",movieRouter)
app.use("/api/user",auth,userRouter)
app.use(notFound)
app.use(errorHandler)

const start = async ()=>{
    try {
        await connect(process.env.MONGODB_URI);
        const port = process.env.PORT || 5000
        app.listen(port,()=>{
            console.log(`listening to port ${port}`)
        })
     
    } catch (error) {
        console.log(error)
    }
}
start()
