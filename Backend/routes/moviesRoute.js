import express from "express"
import { getPopularMovies, getTopRatedMovies,getMovie,getMovieSearch } from "../controllers/movies.js" 
const movieRouter = express.Router()

movieRouter.get("/popular",getPopularMovies)
movieRouter.get("/top_rated",getTopRatedMovies)
movieRouter.get("/search",getMovieSearch)
movieRouter.get("/:movie_id",getMovie)

export default movieRouter