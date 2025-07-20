import mongoose from "mongoose"

const MovieSchema = new mongoose.Schema({
    title:{
        type: String,
        required : [true,"No title provided"],
        trim : true
    },
    poster_path:{
        type: String,
        required: [true,"No url provided"]
    },
    rating:{
        type: Number,
        min: 1,
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
    },
    release_date: {
        type: String,
        required: [true,"No release date provided"],
    },
    original_language: {
        type: String,
        required: [true,"No original language provided"],
    },
    vote_average: {
        type: Number,
        required: [true,"No vote average provided"],
    }
},{_id:false})

export default MovieSchema