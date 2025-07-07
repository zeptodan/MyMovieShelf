import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
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

export default mongoose.model("User",UserSchema)