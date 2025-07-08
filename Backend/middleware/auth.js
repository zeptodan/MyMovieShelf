import jwt from "jsonwebtoken"
const auth=(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({ msg: 'Not logged in' });
    }
    try {
        const payload=jwt.verify(token,process.env.JWT_KEY) 
        req.user = payload
        next()
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token' });
    }
}
export default auth