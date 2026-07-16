import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./modules/auth/auth.routes.js"
import multer from "multer"
import ApiResponse from "./common/config/utils/api-response.js"
import path from 'path'
import { error } from "console"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)

app.post('/test',(req,res)=>{
    res.send({start:true})
})



export default app