import axios from "axios"
import jwt from "jsonwebtoken"
import Movielist from "../models/movielist.js"
const base = 'https://api.themoviedb.org/3'
const getMovie = async(req,res)=>{
    try {
        const movie_id= req.params.movie_id
        const movie = await axios.get(`${base}/movie/${movie_id}`,{
            params: {
                api_key:process.env.TMDB_KEY,
            }
        })
        return res.json(movie.data)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie" });
    }
}
const getHome = async(req,res)=>{
    const popular = await popularMovies()
    const top_rated = await topRatedMovies()
    let home = {popular:popular.results.slice(0,10),top_rated:top_rated.results.slice(0,10)}
    const token = req.cookies.token
    if(token){
        try {
            const payload=jwt.verify(token,process.env.JWT_KEY) 
            const {userID} = payload
            const list = await Movielist.findOne({userID:userID,"list.type":"watchlist"},{list:{$slice:[0,10]}})
            if (list) {
                home.watchlist = list.list
            }
            else {
                home.watchlist = []
            }
            return res.json(home);
        } catch (error) {
            console.log(error.message)
            return res.json(home);
        }
    }
    else{
        return res.json(home);
    }

}
const getMovieByGenre = async(req,res)=>{
    try {
        const genre_id= req.query.genre_id
        const page = req.query.page || 1
        const movies = await axios.get(`${base}/discover/movie`,{
            params: {
                api_key:process.env.TMDB_KEY,
                with_genres: genre_id,
                page:page
            }
        })
        return res.json(movies.data)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
}
//testing only
const getMovieGenres = async(req,res)=>{
    try {
        const movieGenreList = await movieGenres()
        return res.json(movieGenreList)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie genres" });
    }
}
const getMovieSearch = async(req,res)=>{
    try {
        const search= req.query.search
        const page = req.query.page || 1
        const movies = await axios.get(`${base}/search/movie`,{
            params: {
                api_key:process.env.TMDB_KEY,
                page:page,
                query:search
            }
        })
        return res.json(movies.data)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
}
const getPopularMovies = async (req,res)=>{
    try {
        const page = req.query.page || 1
        const movies = await popularMovies(page)
        return res.json(movies)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
}
const getTopRatedMovies = async (req,res)=>{
    try {
        const page = req.query.page || 1
        const movies = await topRatedMovies(page)
        return res.json(movies)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch top Rated movies" });
    }
}


const popularMovies= async(page)=>{
    const movies = await axios.get(`${base}/movie/popular`,{
        params: {
            api_key:process.env.TMDB_KEY,
            page:page
        }
    })
    return movies.data
}
const topRatedMovies= async(page)=>{
    const movies = await axios.get(`${base}/movie/top_rated`,{
        params: {
            api_key:process.env.TMDB_KEY,
            page:page
        }
    })
    return movies.data
}
const movieGenres= async()=>{
    const movieGenres = await axios.get(`${base}/genre/movie/list`,{
        params: {
            api_key:process.env.TMDB_KEY,
        }
    })
    return movieGenres.data
}
export {getPopularMovies,getTopRatedMovies,getMovie,getMovieSearch,getMovieGenres,getMovieByGenre,getHome}
