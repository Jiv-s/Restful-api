import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./modules/auth/auth.routes.js"
import multer from "multer"
import ApiResponse from "./common/config/utils/api-response.js"


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)

app.post('/test',(req,res)=>{
    res.send({start:true})
})
const upload = multer()
app.post('/upload',upload.single('file'),(req,res)=>{
    console.log(req.file)
    ApiResponse.ok(res,"file uploded")
})


export default app