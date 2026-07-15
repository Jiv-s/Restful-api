import "dotenv/config"
import app from "./src/app.js"
import connectdb from "./src/common/db.js"

const PORT = process.env.PORT

const start = async ()=>{
    // await connect db call 
    await connectdb() 
    app.listen(PORT,()=>{
        console.log(`running on port ${PORT} and in ${process.env.NODE_ENV}`)
    })
}

start().catch((e)=>{  //insted of try and catch 
    console.error('something is wrong',e)
    process.exit(1) //stop if start fails successfully 
})