import Movielist from "../models/movielist.js"
import axios from "axios"
import mongoose from "mongoose"
const getList = async(req,res)=>{
    const {userID} = req.user
    const type = req.query.type || "watchlist"
    const page = req.query.page || 1
    try{
        const list = await Movielist.aggregate([
            { $match: { userID:new mongoose.Types.ObjectId(userID) } },
            {
                $project: {
                    filtered: {
                        $filter: {
                            input: "$list",
                            as: "item",
                            cond: { $eq: ["$$item.type", type] }
                        }
                    }
                }
            }
            ,
            {
                $project: {
                    list: {
                        $slice: [ "$filtered",10 * (page - 1), 50 ]
                    },
                    pages: {
                        $ceil: { $divide: [{ $size: "$filtered" }, 50] }
                    }
                }
            }
        ]);
        return res.json(list[0])
    }
    catch (error) {
        return res.json({success:false,msg:"something went wrong"})
    }
}
const postMovie = async(req,res)=>{
    const {userID} = req.user
    const {id,type} = req.body
    const existing=await Movielist.findOne({userID:userID,"list.id":id})
    if (existing){
        await Movielist.updateOne(
            {userID:userID,"list.id":id},
            {$set:{"list.$.type":type}})
        return res.json({success:true,msg:`updated to ${type}`})
    }
    else{
        try {
            const TMDBmovie = await axios.get(`https://api.themoviedb.org/3/movie/${id}`,{
                params: {
                    api_key:process.env.TMDB_KEY,
                }
            })
            const movie = {id:TMDBmovie.data.id,title:TMDBmovie.data.title,poster_path:TMDBmovie.data.poster_path,type:type,release_date:TMDBmovie.data.release_date,original_language:TMDBmovie.data.original_language,vote_average: Math.round(TMDBmovie.data.vote_average*10)/10 }
            await Movielist.updateOne(
                {userID:userID},
                {$push : {list:movie}}
            )
            return res.json({success:true,msg:`added to ${type}`})
        } catch (error) {
            return res.json({success:false,msg:"Failed to add"})
        }
    }
}
const updateRating = async(req,res)=>{
    const {userID} = req.user
    const {rating,id} = req.body
    try {
        await Movielist.updateOne(
            {userID:userID,"list.id":id},
            {$set:{"list.$.rating":rating}},
            {runValidators:true})
    } catch (error) {
        return res.json({success:false,msg:"Failed to update"})
    }
    return res.json({success:true,msg:"Updated rating"})
}
const loggedin = async(req,res)=>{
    return res.json({success:true,msg:"logged in",user:req.user.name})
}
const logout = async(req,res)=>{
    if (!req.cookies.token){
        return res.json({success:false,msg:"Not logged in"})
    }
    res.clearCookie("token",{
        httpOnly:true,
    })
    return res.json({success:true,msg:"logged out"})
}
const deleteMovie = async(req,res)=>{
    const {userID} = req.user
    const id = req.params.id
    try {
        const result = await Movielist.updateOne(
            {userID:userID},
            {$pull : {list:{id:id}}}
        )
        if (result.modifiedCount === 0) {
            return res.json({success:false,msg:"Movie not found in list"})
        }
        return res.json({success:true,msg:"Removed from list"})
    } catch (error) {
        return res.json({success:false,msg:"Failed to remove from list"})
    }
}

export {getList,postMovie,updateRating,loggedin,logout,deleteMovie}