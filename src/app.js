import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./modules/auth/auth.routes.js"

import ownerRouter from "./modules/ipl/routes/owner.js"
import teamRouter from "./modules/ipl/routes/teams.js"
import multer from "multer"
import ApiResponse from "./common/config/utils/api-response.js"
import path from 'path'
import { error } from "console"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/owner",ownerRouter)
app.use("/api/team",teamRouter)

app.post('/test',(req,res)=>{
    res.send({start:true})
})



export default app