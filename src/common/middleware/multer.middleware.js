import path from 'path'
import multer from 'multer'


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
        const allowed = ["image/png","image/jpeg","webp"]
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

export default upload

