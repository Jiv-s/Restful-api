import * as broadcasterServices from "../services/broadcaster.js"
import ApiResponse from "../../../common/config/utils/api-response.js"


const createBroadcaster = async(req,res)=>{
    const broadcaster = await broadcasterServices.createBroadcaster(req.body)
    return ApiResponse.ok(res,"created broadcaster",broadcaster)

}
const getAllBroadcaster = async(req,res)=>{
    const broadcaster = await broadcasterServices.getAllBroadcaster()
    return ApiResponse.ok(res,"list of all broadcaster",broadcaster)
}
const getBroadcasterById = async(req,res)=>{
    const broadcaster = await broadcasterServices.getBroadcasterById(req.params.id)
    return ApiResponse.ok(res,"required broadcaster",broadcaster)
}
const updateBroadcaster = async(req,res)=>{
    const broadcaster = await broadcasterServices.updateBroadcaster(req.params.id,req.body)
    return ApiResponse.ok(res,"updated the broadcaster",broadcaster)
}
const deleteBroadcaster = async(req,res)=>{
    const broadcaster=await broadcasterServices.deleteBroadcaster(req.params.id)
    return ApiResponse.ok(res,"broadcaster deleted",broadcaster)
}

export {
    createBroadcaster,
    getAllBroadcaster,
    getBroadcasterById,
    updateBroadcaster,
    deleteBroadcaster,
}