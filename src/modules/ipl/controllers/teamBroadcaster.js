import * as teamBroadcasterServices from "../services/teambroadcaster.js";
import ApiResponse from "../../../common/config/utils/api-response.js";

const createTeamBroadcaster = async (req, res) => {
    const mapping = await teamBroadcasterServices.createTeamBroadcaster(req.body);
    return ApiResponse.created(res, "team-broadcaster created", mapping);
};

const getAllTeamBroadcaster = async (req, res) => {
    const mappings = await teamBroadcasterServices.getAllTeamBroadcaster();
    return ApiResponse.ok(res, "list of all team-broadcaster mappings", mappings);
};

const getTeamBroadcasterById = async (req, res) => {
    const mapping = await teamBroadcasterServices.getTeamBroadcasterById(req.params.id);
    return ApiResponse.ok(res, "required team-broadcaster mapping", mapping);
};

const updateTeamBroadcaster = async (req, res) => {
    const mapping = await teamBroadcasterServices.updateTeamBroadcaster(req.params.id, req.body);
    return ApiResponse.updated(res, "team-broadcaster updated", mapping);
};

const deleteTeamBroadcaster = async (req, res) => {
    const mapping = await teamBroadcasterServices.deleteTeamBroadcaster(req.params.id);
    return ApiResponse.ok(res, "team-broadcaster deleted", mapping);
};

export {
    createTeamBroadcaster,
    getAllTeamBroadcaster,
    getTeamBroadcasterById,
    updateTeamBroadcaster,
    deleteTeamBroadcaster,
};
