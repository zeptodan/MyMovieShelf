import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [true,"No name provided"],
        trim : true
    },
    password:{
        type: String,
        required: [true,"No password provided"]
    }
})
UserSchema.pre("save",async function(next){
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password,salt)
    next()
})
UserSchema.methods.createJWT = function(){
    return jwt.sign({userID:this._id,name: this.name},process.env.JWT_KEY,{expiresIn:"30d"})
}

export default mongoose.model("User",UserSchema)