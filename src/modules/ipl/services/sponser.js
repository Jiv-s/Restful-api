import mongoose from "mongoose";
import ApiError from "../../../common/config/utils/api-error.js";
import Sponser from "../models/sponser.js";

const createSponser = async({name})=>{
    if(!name) throw ApiError.badRequest("sponser name is required")
    const sponser = await Sponser.create({name})
    return sponser
}
const getAllSponser = async()=>{
    const sponser = await Sponser.find()
    if(sponser.length === 0) throw ApiError.notfound("no sponser exists")
    return sponser
}
const getSponserById = async(id)=>{
    if(!id) throw ApiError.badRequest("id is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("id format is not valid")
    const sponser = await Sponser.findById(id)
    if(!sponser) throw ApiError.notfound("id is wrong or no longer exists")
    return sponser 
}
const updateSponser = async(id,{name})=>{
    if(!id||!name) throw ApiError.badRequest("id and name is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("id is not of valid format")
    const sponser = await Sponser.findByIdAndUpdate(id,{name},{new:true,runValidators:true})
    if(!sponser) throw ApiError.notfound("cant find sponser to update")
    return sponser
}
const deleteSponser = async(id)=>{
    if(!id) throw ApiError.badRequest("id is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("id is not of valid format")
    const sponser = await Sponser.findByIdAndDelete(id)
    if(!sponser) throw ApiError.notfound("cant find sponser to delete")
    return sponser
}

export {
    createSponser,
    getAllSponser,
    getSponserById,
    updateSponser,
    deleteSponser,
}