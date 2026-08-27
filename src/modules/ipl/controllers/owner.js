import * as ownerServices from "../services/owner.js"
import ApiResponse from "../../../common/config/utils/api-response.js"
const createOwner = async (req,res)=>{
    const owner = await ownerServices.createOwner(req.body)
    ApiResponse.created(res,"owner created",owner)
}
const getAllOwner = async (req,res)=>{
    const owners = await ownerServices.getAllOwner()
    ApiResponse.ok(res,"list of all owners",owners)
}
const getOwnerById = async (req,res)=>{
    const owner = await ownerServices.getOwnerById(req.params.id)
    ApiResponse.ok(res,"required owner",owner)
}
const updatedOwner = async (req,res)=>{
    const updatedOwoner = await ownerServices.updatedOwner(req.params.id,req.body)
    ApiResponse.updated(res,"owner updated",updatedOwner)
}
const deleteOwner = async (req,res)=>{
    const deletedOwner = await ownerServices.deleteOwner(req.params.id)
    return res.status(200).json({sucess:true, deletedOwner})    
}

export {
    createOwner,
    getAllOwner,
    getOwnerById,
    updatedOwner,
    deleteOwner,
}