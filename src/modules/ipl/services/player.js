import ApiError from "../../../common/config/utils/api-error.js";
import Player from "../models/player.js";
import Team from "../models/team.js";
import mongoose, { mongo } from "mongoose";




const createplayer = async({name,teamId,role})=>{
    
    if(!name || !teamId || !role) throw ApiError.badRequest("name and teamId and role is required")
    const team = await Team.findById(teamId)
    if(!team) throw ApiError.notfound("team doesnot exist")
    const roles = ["Batsmen","Bowler","wicketKeeper","AllRounder"]
    if(!roles.includes(role)) throw ApiError.badRequest(`player role should be "Batsmen","Bowler","wicketKeeper","AllRounder" `)
    const player =  await Player.create({name,teamId,role})
        
    return player
                
}

const  getAllplayer = async()=>{
    const players  = await Player.find()
    if(players.length === 0) throw ApiError.notfound("no player avalable") // as it returns an array or empty array
    return players
}

const getplayerById = async(id)=>{
    if(!id) throw ApiError.badRequest("id is required")
// new learning// 
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("player id is of wrong format")
    const player = await Player.findById(id)
    if(!player) throw ApiError.notfound("player id is wrong or no longer exist")
    return player
}

const updateplayer = async(id,{name,teamId,role})=>{
    if(!id || !name || !teamId ||!role) throw ApiError.badRequest("provide all fields") //each one of them require an !
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("player id is of wrong format")
    const player = await Player.findByIdAndUpdate(id,{name,teamId,role}, {new:true,runValidators:true}) //as mongoose by default returns old so we say return new and reun validations while createing new or you can use  { returnDocument: "after" }
    if(!player) throw ApiError.notfound("player not found")
    return player
}

const deleteplayer = async(id)=>{
    if(!id) throw ApiError.badRequest("id is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("player id is of wrong format")
    const deletedplayer = await Player.findByIdAndDelete(id)
    if(!deletedplayer) throw ApiError.notfound("player not found")
    return deletedplayer

}

export {
    createplayer,
    getAllplayer,
    getplayerById,
    updateplayer,
    deleteplayer,
}