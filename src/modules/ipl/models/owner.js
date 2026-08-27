
import mongoose from "mongoose";
const ownerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minLength:2,
        maxLength:50,
        trim:true,
    },
    company:{
        type:String,
        required:[true,"company name is required"],
        minLength:2,
        maxLength:50,
        trim:true,
    }
},{timestamps:true})

export default mongoose.model("Owner",ownerSchema)