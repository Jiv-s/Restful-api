// todo add validations for each services for diffrent cases 

import mongoose from "mongoose";
import ApiError from "../../../common/config/utils/api-error.js";
import Owner from "../models/owner.js";

const createOwner = async({name,company})=>{
    if(!name || ! company) throw ApiError.badRequest("name and company are required")
    const owner = await Owner.create({name,company})
    return owner
}

const getAllOwner = async()=>{
    
    const owners = await Owner.find()
    if(ownles.length === 0) throw ApiError.badRequest("no owners exists")
    return owners // return array of objects 
}

const getOwnerById = async(id)=>{
    if(!id) throw ApiError.badRequest("id is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("id is not of req format")
    const owner = await Owner.findById(id)

    if (!owner) {
    throw new Error("Owner not found");
    }

    return owner
}

const updatedOwner = async(id,{name,company})=>{
    if(!id||!name||!company) throw ApiError.badRequest("id name and company is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("id is not of req format")
    const updatedOwoner = await Owner.findByIdAndUpdate(id,{name,company}, {new:true,runValidators:true})
    if(!updatedOwner) throw ApiError.badRequest("no owner with the id exists")
    return updatedOwner
}
const deleteOwner = async(id)=>{
    if(!id) throw ApiError.badRequest("id is required")
    if(!mongoose.Types.ObjectId.isValid(id)) throw ApiError.badRequest("id is not of req format")
    const deletedOwner = await Owner.findByIdAndDelete(id)
    if(!deletedOwner) throw ApiError.badRequest("no owner with the id exists")
    return deletedOwner 
}

export{
    createOwner,
    getAllOwner,
    getOwnerById,
    updatedOwner,
    deleteOwner,
}