import { Router } from "express";
import * as teamBroadcasterController from "../controllers/teamBroadcaster.js";

const router = new Router();

router.post("/", teamBroadcasterController.createTeamBroadcaster);
router.get("/", teamBroadcasterController.getAllTeamBroadcaster);
router.get("/:id", teamBroadcasterController.getTeamBroadcasterById);
router.put("/:id", teamBroadcasterController.updateTeamBroadcaster);
router.delete("/:id", teamBroadcasterController.deleteTeamBroadcaster);

export default router;