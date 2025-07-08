import mongoose from "mongoose";
import MovieSchema from "./movie.js";
const MovielistSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required: [true,"no id provided"]
    },
    list:[MovieSchema]
})

export default mongoose.model("Movielist",MovielistSchema)