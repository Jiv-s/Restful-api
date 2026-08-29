import ApiError from "../../../common/config/utils/api-error.js";
import Team from "../models/team.js";
import Owner from "../models/owner.js";
import mongoose, { mongo } from "mongoose";




const createTeam = async({name,ownerId})=>{
    
    if(!name || !ownerId) throw ApiError.badRequest("name and ownerId is required")
    const owner = await Owner.findById(ownerId)
    if(!owner) throw ApiError.notfound("owner doesnot exist")
    const team =  await Team.create({name,ownerId})
        
    return team
                
}

const getAllTeam = async()=>{
    const teams  = await Team.find()
    if(teams.length === 0) throw ApiError.notfound("no team avalable") // as it returns an array or empty array
    return teams
}

const getTeamById = async(id)=>{
    if(!id) throw ApiError.badRequest("id is required")
// new learning// 
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("team id is of wrong format")
    const team = await Team.findById(id)
    if(!team) throw ApiError.notfound("team id is wrong or no longer exist")
    return team
}

const updateTeam = async(id,{name,ownerId})=>{
    if(!id || !name || !ownerId) throw ApiError.badRequest("provide all fields") //each one of them require an !
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("team id is of wrong format")
    const team = await Team.findByIdAndUpdate(id,{name,ownerId}, {new:true,runValidators:true}) //as mongoose by default returns old so we say return new and reun validations while createing new or you can use  { returnDocument: "after" }
    if(!team) throw ApiError.notfound("team not found")
    return team
}

const deleteTeam = async(id)=>{
    if(!id) throw ApiError.badRequest("id is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("team id is of wrong format")
    const deletedTeam = await Team.findByIdAndDelete(id)
    if(!deletedTeam) throw ApiError.notfound("team not found")
    return deletedTeam

}

export {
    createTeam,
    getAllTeam,
    getTeamById,
    updateTeam,
    deleteTeam,
}