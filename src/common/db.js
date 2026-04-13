import mongoose from "mongoose"

const connectdb = async()=>{
   const conn = await mongoose.connect(process.env.MONGO_URI);
   //todo
   console.log(`mongoose connected: ${conn.connection.host}`)//127.0.0.1  GIVES THE SERVER ADDRESS YOU CONNECTED TO
}

export default connectdb