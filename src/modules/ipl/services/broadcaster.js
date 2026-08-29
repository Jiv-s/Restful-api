import mongoose from "mongoose";
import ApiError from "../../../common/config/utils/api-error.js";
import Broadcaster from "../models/broadcaster.js";

const createBroadcaster = async({name})=>{
    if(!name) throw ApiError.badRequest("broadcaster name is required")
    const broadcaster = await Broadcaster.create({name})
    return broadcaster
}
const getAllBroadcaster = async()=>{
    const broadcaster = await Broadcaster.find()
    if(broadcaster.length === 0) throw ApiError.notfound("no broadcaster exists")
    return broadcaster
}
const getBroadcasterById = async(id)=>{
    if(!id) throw ApiError.badRequest("id is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("id format is not valid")
    const broadcaster = await Broadcaster.findById(id)
    if(!broadcaster) throw ApiError.notfound("id is wrong or no longer exists")
    return broadcaster 
}
const updateBroadcaster = async(id,{name})=>{
    if(!id||!name) throw ApiError.badRequest("id and name is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("id is not of valid format")
    const broadcaster = await Broadcaster.findByIdAndUpdate(id,{name},{new:true,runValidators:true})
    if(!broadcaster) throw ApiError.notfound("cant find broadcaster to update")
    return broadcaster
}
const deleteBroadcaster = async(id)=>{
    if(!id) throw ApiError.badRequest("id is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("id is not of valid format")
    const broadcaster = await Broadcaster.findByIdAndDelete(id)
    if(!broadcaster) throw ApiError.notfound("cant find broadcaster to delete")
    return broadcaster
}

export {
    createBroadcaster,
    getAllBroadcaster,
    getBroadcasterById,
    updateBroadcaster,
    deleteBroadcaster,
}