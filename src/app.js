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

//default is the memory but disk storage is used to store on server 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
//used to store the file at given loaction starts from the root
//used to give unique name to each filr and preservr the extention of the upoaded file using path 
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+ext)
  }
})

const upload = multer({ storage: storage,
    limits:{fileSize:1024*1024*1},
    fileFilter:(req,file,cb)=>{
        const allowed = ["image/png","image/jpeg","application/pdf"]
        if(allowed.includes(file.mimetype)) {
            cb(null,true)
        }
        else{
            cb("file not supported",false) 
        }
        
    }
})

//upload.array("files") c.log(req.files) =>> for multiple files and 
//upload.filds({{name:"pfp,maxcpunt :1"}}) =>> used to set only matched name adn the givem=n count is uploaded

app.post('/upload',upload.array('files'),(req,res)=>{
    console.log(req.files)
    ApiResponse.ok(res,"file uploded")
})


export default app