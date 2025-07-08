import express from "express"
import { getList,postMovie,updateRating } from "../controllers/userList.js"
const userRouter = express.Router()

userRouter.get("/list",getList)
userRouter.post("/list",postMovie)
userRouter.put("/list",updateRating)
export default userRouter