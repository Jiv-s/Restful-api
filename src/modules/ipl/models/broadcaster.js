import mongoose from "mongoose";

const broadcasterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minLength:2,
        maxLength:50,
        trim:true,
    }
   
},{timestamps:true})

export default mongoose.model("Broadcaster",broadcasterSchema)