import * as teamSponserServices from "../services/teamsponser.js";
import ApiResponse from "../../../common/config/utils/api-response.js";

const createTeamSponser = async (req, res) => {
    const mapping = await teamSponserServices.createTeamSponser(req.body);
    return ApiResponse.created(res, "team-sponser created", mapping);
};

const getAllTeamSponser = async (req, res) => {
    const mappings = await teamSponserServices.getAllTeamSponser();
    return ApiResponse.ok(res, "list of all team-sponser mappings", mappings);
};

const getTeamSponserById = async (req, res) => {
    const mapping = await teamSponserServices.getTeamSponserById(req.params.id);
    return ApiResponse.ok(res, "required team-sponser mapping", mapping);
};

const updateTeamSponser = async (req, res) => {
    const mapping = await teamSponserServices.updateTeamSponser(req.params.id, req.body);
    return ApiResponse.updated(res, "team-sponser updated", mapping);
};

const deleteTeamSponser = async (req, res) => {
    const mapping = await teamSponserServices.deleteTeamSponser(req.params.id);
    return ApiResponse.ok(res, "team-sponser deleted", mapping);
};

export {
    createTeamSponser,
    getAllTeamSponser,
    getTeamSponserById,
    updateTeamSponser,
    deleteTeamSponser,
};
