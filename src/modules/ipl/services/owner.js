// todo add validations for each services for diffrent cases 

import Owner from "../models/owner.js";

const createOwner = async({name,company})=>{
    const owner = await Owner.create({name,company})
    return owner
}

const getAllOwner = async()=>{
    
    const owners = await Owner.find()
    return owners // return array of objects 
}

const getOwnerById = async(id)=>{
    const owner = await Owner.findById(id)

    if (!owner) {
    throw new Error("Owner not found");
    }

    return owner
}

const updatedOwner = async(id,{name,company})=>{
    const updatedOwoner = await Owner.findByIdAndUpdate(id,{name,company}, {new:true,runValidators:true})
    return updatedOwner
}
const deleteOwner = async(id)=>{
    const deletedOwner = await Owner.findByIdAndDelete(id)
    return deletedOwner 
}

export{
    createOwner,
    getAllOwner,
    getOwnerById,
    updatedOwner,
    deleteOwner,
}