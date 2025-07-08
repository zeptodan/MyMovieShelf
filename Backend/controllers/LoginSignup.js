import User from "../models/user.js";
import Movielist from "../models/movielist.js";
import bcrypt from "bcryptjs";
const signup = async (req,res)=>{
    const {name,password} = req.body;
    if (!name){
        return res.json({success:false,msg:"No Name provided"})
    }
    if (!password){
        return res.json({success:false,msg:"No Password provided"})
    }
    const isUser = await User.findOne({name:name})
    if(isUser){
        return res.json({success:false,msg:"Name already taken"})
    }
    const thisUser=await User.create(req.body)
    await Movielist.create({userID:thisUser._id})
    return res.json({success:true,msg:"user created"})
}

const login = async (req,res)=>{
    const {name,password} = req.body;
    if (!name){
        return res.json({success:false,msg:"No Name provided"})
    }
    if (!password){
        return res.json({success:false,msg:"No Password provided"})
    }
    const thisUser = await User.findOne({name:name})
    if(!thisUser){
        return res.json({success:false,msg:"Invalid name"})
    }
    if (!(await bcrypt.compare(password,thisUser.password))){
        return res.json({success:false,msg:"Invalid password"})
    }
    const jwt=thisUser.createJWT()
    res.cookie("token",jwt,{httpOnly:true})
    return res.json({success:true,msg:"user logged in"})
}

export {signup,login}