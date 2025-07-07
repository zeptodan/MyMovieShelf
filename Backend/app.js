import express from "express"
const app = express()

 app.get("/",(req,res)=>{
    res.end("Hello world")
 })

 app.listen(5000)