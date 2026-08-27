import mongoose from "mongoose";
import Team from "./team.js"
import Broadcaster from "./broadcaster.js";

const teamBroadcasterSchema = new mongoose.Schema({
    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:[true,"team is required"]
    },
    broadcaster:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Broadcaster",
        required:[true,"broadcaster is required"]
    }
},{timestamps:true})
// this is required for junction table for 
// junction table is the table btw all N-M relations table 

//using index to make each entry unique this is important whitout it 

teamBroadcasterSchema.index({team:1,broadcaster:1},{unique:true})
export default mongoose.model("TeamBroadcaster",teamBroadcasterSchema)