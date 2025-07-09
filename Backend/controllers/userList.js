import Movielist from "../models/movielist.js"
import axios from "axios"

const getList = async(req,res)=>{
    const {userID} = req.user
    const type = req.query.type || "watchlist"
    const page = req.query.page || 1
    try{
        const list = await Movielist.findOne({userID:userID,"list.type":type})
        const obj = {pages:Math.ceil(list.length/20),list:list.list.slice(page*20,page*20+20)}
        return res.json(obj)
    }
    catch{
        return res.json({success:false,msg:"something went wrong"})
    }
}
const postMovie = async(req,res)=>{
    const {userID} = req.user
    const type = req.query.type
    const id = req.query.id
    const existing=await Movielist.findOne({userID:userID,"list.id":id})
    if (existing){
        await Movielist.updateOne(
            {userID:userID,"list.id":id},
            {$set:{"list.$.type":type}})
        return res.json({success:true,msg:"Updated successfully"})
    }
    else{
        try {
            const TMDBmovie = await axios.get(`https://api.themoviedb.org/3/movie/${id}`,{
                params: {
                    api_key:process.env.TMDB_KEY,
                }
            })
            const movie = {id:TMDBmovie.data.id,title:TMDBmovie.data.title,poster_url:TMDBmovie.data.poster_path,type:type}
            await Movielist.updateOne(
                {userID:userID},
                {$push : {list:movie}}
            )
            return res.json({success:true,msg:"added successfully"})
        } catch (error) {
            return res.json({success:false,msg:"Failed to add"})
        }
    }
}
const updateRating = async(req,res)=>{
    const {userID} = req.user
    const id = req.query.id
    try {
        const rating = Number(req.query.rating)
        await Movielist.updateOne(
            {userID:userID,"list.id":id},
            {$set:{"list.$.rating":rating}},
            {runValidators:true})
    } catch (error) {
        return res.json({success:false,msg:"Failed to update"})
    }
    return res.json({success:true,msg:"Updated successfully"})
}
const loggedin = async(req,res)=>{
    return json({msg:"logged in"})
}

export {getList,postMovie,updateRating,loggedin}