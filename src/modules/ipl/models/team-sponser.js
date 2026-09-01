import mongoose from "mongoose";
import Team from "./team.js";
import Sponser from "./sponser.js";

const teamSponserSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: [true, "team is required"],
    },
    sponser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sponser",
        required: [true, "sponser is required"],
    },
}, { timestamps: true });

// This is required for junction-table N:M relations.
teamSponserSchema.index({ team: 1, sponser: 1 }, { unique: true });

export default mongoose.model("TeamSponser", teamSponserSchema);