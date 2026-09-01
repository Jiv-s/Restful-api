import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./modules/auth/auth.routes.js"

import ownerRouter from "./modules/ipl/routes/owner.js"
import teamRouter from "./modules/ipl/routes/teams.js"
import playerRouter from "./modules/ipl/routes/players.js"
import sponserRouter from "./modules/ipl/routes/sponser.js"
import broadcasterRouter from "./modules/ipl/routes/broadcaster.js"
import teamBroadcasterRouter from "./modules/ipl/routes/team-broadcaster.js"
import teamSponserRouter from "./modules/ipl/routes/team-sponser.js"

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
app.use("/api/player",playerRouter)
app.use("/api/sponser",sponserRouter)
app.use("/api/broadcaster",broadcasterRouter)
app.use("/api/team-broadcaster", teamBroadcasterRouter)
app.use("/api/team-sponser", teamSponserRouter)

app.post('/test',(req,res)=>{
    res.send({start:true})
})



export default app