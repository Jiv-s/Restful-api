import mongoose from "mongoose";
import Owner from "./owner.js"

const teamSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minLength:2,
        maxLength:50,
        trim:true,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Owner
    }
},{timestamps:true})

export default mongoose.model("Team",teamSchema)
