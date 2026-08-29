import * as playerServices from "../services/player.js"
import ApiResponse from "../../../common/config/utils/api-response.js"

const createplayer = async(req,res)=>{
    const player  = await playerServices.createplayer(req.body)
    return ApiResponse.created(res,"player created",player)
}
const getAllplayer = async(req,res)=>{
    const player = await playerServices.getAllplayer()
    return ApiResponse.ok(res,"list of all players",player)
}
const getplayerById = async(req,res)=>{
    const player = await playerServices.getplayerById(req.params.id)
    return ApiResponse.ok(res,"req player details",player)
}
const updateplayer = async(req,res)=>{
    const player = await playerServices.updateplayer(req.params.id,req.body)
    return ApiResponse.updated(res,"updated player details",player)
}
const deleteplayer = async(req,res)=>{
    const player = await playerServices.deleteplayer(req.params.id)
    return ApiResponse.ok(res,"player deleted",player)
}

export {
    createplayer,
    getAllplayer,
    getplayerById,
    updateplayer,
    deleteplayer
}