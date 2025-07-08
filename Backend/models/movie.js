import mongoose from "mongoose"

const MovieSchema = new mongoose.Schema({
    title:{
        type: String,
        required : [true,"No title provided"],
        trim : true
    },
    poster_url:{
        type: String,
        required: [true,"No url provided"]
    },
    rating:{
        type: Number,
        min: 0,
        max: 10,
        validate: {
            validator: Number.isInteger,
            message: 'Rating must be an integer'
        }
    },
    type:{
        type: String,
        required: [true,"No type provided"],
        enum: ["completed","watchlist"]
    },
    id: {
        type: Number,
        required: [true,"No id provided"],
    }
},{_id:false})

export default MovieSchema