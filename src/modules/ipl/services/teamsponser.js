import mongoose from "mongoose";
import ApiError from "../../../common/config/utils/api-error.js";
import Team from "../models/team.js";
import Sponser from "../models/sponser.js";
import TeamSponser from "../models/team-sponser.js";

const createTeamSponser = async ({ team, sponser }) => {
    if (!team || !sponser) {
        throw ApiError.badRequest("team and sponser are required");
    }

    if (!mongoose.Types.ObjectId.isValid(team)) {
        throw ApiError.badRequest("team id is not valid");
    }

    if (!mongoose.Types.ObjectId.isValid(sponser)) {
        throw ApiError.badRequest("sponser id is not valid");
    }

    const teamExists = await Team.findById(team);
    if (!teamExists) throw ApiError.notfound("team does not exist");

    const sponserExists = await Sponser.findById(sponser);
    if (!sponserExists) throw ApiError.notfound("sponser does not exist");

    const existingMapping = await TeamSponser.findOne({ team, sponser });
    if (existingMapping) {
        throw ApiError.badRequest("this team-sponser mapping already exists");
    }

    return TeamSponser.create({ team, sponser });
};

const getAllTeamSponser = async () => {
    const mappings = await TeamSponser.find()
        .populate("team", "name")
        .populate("sponser", "name");

    if (mappings.length === 0) {
        throw ApiError.notfound("no team-sponser mapping exists");
    }

    return mappings;
};

const getTeamSponserById = async (id) => {
    if (!id) throw ApiError.badRequest("id is required");
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest("team-sponser id is not valid");
    }

    const mapping = await TeamSponser.findById(id)
        .populate("team", "name")
        .populate("sponser", "name");

    if (!mapping) {
        throw ApiError.notfound("team-sponser mapping not found");
    }

    return mapping;
};

const updateTeamSponser = async (id, { team, sponser }) => {
    if (!id) throw ApiError.badRequest("id is required");
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest("team-sponser id is not valid");
    }

    if (!team && !sponser) {
        throw ApiError.badRequest("provide at least one field to update");
    }

    const updateData = {};

    if (team) {
        if (!mongoose.Types.ObjectId.isValid(team)) {
            throw ApiError.badRequest("team id is not valid");
        }

        const teamExists = await Team.findById(team);
        if (!teamExists) throw ApiError.notfound("team does not exist");

        updateData.team = team;
    }

    if (sponser) {
        if (!mongoose.Types.ObjectId.isValid(sponser)) {
            throw ApiError.badRequest("sponser id is not valid");
        }

        const sponserExists = await Sponser.findById(sponser);
        if (!sponserExists) throw ApiError.notfound("sponser does not exist");

        updateData.sponser = sponser;
    }

    const updatedMapping = await TeamSponser.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!updatedMapping) {
        throw ApiError.notfound("team-sponser mapping not found");
    }

    return updatedMapping;
};

const deleteTeamSponser = async (id) => {
    if (!id) throw ApiError.badRequest("id is required");
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest("team-sponser id is not valid");
    }

    const deletedMapping = await TeamSponser.findByIdAndDelete(id);
    if (!deletedMapping) {
        throw ApiError.notfound("team-sponser mapping not found");
    }

    return deletedMapping;
};

export {
    createTeamSponser,
    getAllTeamSponser,
    getTeamSponserById,
    updateTeamSponser,
    deleteTeamSponser,
};
