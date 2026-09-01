import { Router } from "express";
import * as teamSponserController from "../controllers/teamSponser.js";

const router = new Router();

router.post("/", teamSponserController.createTeamSponser);
router.get("/", teamSponserController.getAllTeamSponser);
router.get("/:id", teamSponserController.getTeamSponserById);
router.put("/:id", teamSponserController.updateTeamSponser);
router.delete("/:id", teamSponserController.deleteTeamSponser);

export default router;
