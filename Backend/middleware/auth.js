import jwt from "jsonwebtoken"
const auth=(req,res,next)=>{
    token = req.cookie.token
    if(!token){
        return res.status(401).json({ msg: 'Not logged in' });
    }
    try {
        const payload=jwt.verify(token,process.env.JWT_KEY) 
        res.user = payload
        next()
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token' });
    }
}
export default auth