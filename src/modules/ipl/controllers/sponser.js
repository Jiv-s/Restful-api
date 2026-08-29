import * as sponserServices from "../services/sponser.js"
import ApiResponse from "../../../common/config/utils/api-response.js"


const createSponser = async(req,res)=>{
    const sponser = await sponserServices.createSponser(req.body)
    return ApiResponse.ok(res,"created sponser",sponser)

}
const getAllSponser = async(req,res)=>{
    const sponser = await sponserServices.getAllSponser()
    return ApiResponse.ok(res,"list of all sponser",sponser)
}
const getSponserById = async(req,res)=>{
    const sponser = await sponserServices.getSponserById(req.params.id)
    return ApiResponse.ok(res,"required sponser",sponser)
}
const updateSponser = async(req,res)=>{
    const sponser = await sponserServices.updateSponser(req.params.id,req.body)
    return ApiResponse.ok(res,"updated the sponser",sponser)
}
const deleteSponser = async(req,res)=>{
    const sponser=await sponserServices.deleteSponser(req.params.id)
    return ApiResponse.ok(res,"sponser deleted",sponser)
}

export {
    createSponser,
    getAllSponser,
    getSponserById,
    updateSponser,
    deleteSponser,
}