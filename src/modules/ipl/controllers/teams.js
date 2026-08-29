import * as teamServices from "../services/teams.js"
import ApiResponse from "../../../common/config/utils/api-response.js"

const createTeam = async(req,res)=>{
    const team  = await teamServices.createTeam(req.body)
    return ApiResponse.created(res,"team created",team)
}
const getAllTeam = async(req,res)=>{
    const team = await teamServices.getAllTeam()
    return ApiResponse.ok(res,"list of all teams",team)
}
const getTeamById = async(req,res)=>{
    const team = await teamServices.getTeamById(req.params.id)
    return ApiResponse.ok(res,"req team details",team)
}
const updateTeam = async(req,res)=>{
    const team = await teamServices.updateTeam(req.params.id,req.body)
    return ApiResponse.updated(res,"updated team details",team)
}
const deleteTeam = async(req,res)=>{
    const team = await teamServices.deleteTeam(req.params.id)
    return ApiResponse.ok(res,"team deleted",team)
}

export {
    createTeam,
    getAllTeam,
    getTeamById,
    updateTeam,
    deleteTeam
}