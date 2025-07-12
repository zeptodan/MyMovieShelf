import express from "express"
import { getList,postMovie,updateRating,loggedin,logout } from "../controllers/userList.js"
const userRouter = express.Router()

userRouter.get("/list",getList)
userRouter.get("/auth",loggedin)
userRouter.get("/logout",logout)
userRouter.post("/list",postMovie)
userRouter.put("/list",updateRating)

export default userRouter