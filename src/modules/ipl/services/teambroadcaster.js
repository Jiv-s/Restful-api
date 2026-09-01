import mongoose from "mongoose";
import ApiError from "../../../common/config/utils/api-error.js";
import Team from "../models/team.js";
import Broadcaster from "../models/broadcaster.js";
import TeamBroadcaster from "../models/team-broadcaster.js";

const createTeamBroadcaster = async ({ team, broadcaster }) => {
    if (!team || !broadcaster) {
        throw ApiError.badRequest("team and broadcaster are required");
    }

    if (!mongoose.Types.ObjectId.isValid(team)) {
        throw ApiError.badRequest("team id is not valid");
    }

    if (!mongoose.Types.ObjectId.isValid(broadcaster)) {
        throw ApiError.badRequest("broadcaster id is not valid");
    }

    const teamExists = await Team.findById(team);
    if (!teamExists) throw ApiError.notfound("team does not exist");

    const broadcasterExists = await Broadcaster.findById(broadcaster);
    if (!broadcasterExists) throw ApiError.notfound("broadcaster does not exist");

    const existingMapping = await TeamBroadcaster.findOne({ team, broadcaster });
    if (existingMapping) {
        throw ApiError.badRequest("this team-broadcaster mapping already exists");
    }

    return TeamBroadcaster.create({ team, broadcaster });
};

const getAllTeamBroadcaster = async () => {
    const mappings = await TeamBroadcaster.find()
        .populate("team", "name")
        .populate("broadcaster", "name");

    if (mappings.length === 0) {
        throw ApiError.notfound("no team-broadcaster mapping exists");
    }

    return mappings;
};

const getTeamBroadcasterById = async (id) => {
    if (!id) throw ApiError.badRequest("id is required");
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest("team-broadcaster id is not valid");
    }

    const mapping = await TeamBroadcaster.findById(id)
        .populate("team", "name")
        .populate("broadcaster", "name");

    if (!mapping) {
        throw ApiError.notfound("team-broadcaster mapping not found");
    }

    return mapping;
};

const updateTeamBroadcaster = async (id, { team, broadcaster }) => {
    if (!id) throw ApiError.badRequest("id is required");
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest("team-broadcaster id is not valid");
    }

    if (!team && !broadcaster) {
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

    if (broadcaster) {
        if (!mongoose.Types.ObjectId.isValid(broadcaster)) {
            throw ApiError.badRequest("broadcaster id is not valid");
        }

        const broadcasterExists = await Broadcaster.findById(broadcaster);
        if (!broadcasterExists) throw ApiError.notfound("broadcaster does not exist");

        updateData.broadcaster = broadcaster;
    }

    const updatedMapping = await TeamBroadcaster.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!updatedMapping) {
        throw ApiError.notfound("team-broadcaster mapping not found");
    }

    return updatedMapping;
};

const deleteTeamBroadcaster = async (id) => {
    if (!id) throw ApiError.badRequest("id is required");
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw ApiError.badRequest("team-broadcaster id is not valid");
    }

    const deletedMapping = await TeamBroadcaster.findByIdAndDelete(id);
    if (!deletedMapping) {
        throw ApiError.notfound("team-broadcaster mapping not found");
    }

    return deletedMapping;
};

export {
    createTeamBroadcaster,
    getAllTeamBroadcaster,
    getTeamBroadcasterById,
    updateTeamBroadcaster,
    deleteTeamBroadcaster,
};
