import mongoose from "mongoose";
import Team from "./team.js"


const playerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minLength:2,
        maxLength:50,
        trim:true,
    },
    role:{
        type:String,
        required:[true,"role is required"],
        enum:{
            values:["Batsmen","Bowler","wicketKeeper","AllRounder"],
            message:"role must be from supported values"
        }
    },
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:[true,"team is required "]
    }
},{timestamps:true})

export default mongoose.model("Player",playerSchema)
