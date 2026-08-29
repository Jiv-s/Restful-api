import { Router } from "express";
import * as teamControllers from "../controllers/teams.js"
import team from "../models/team.js";

const router = new Router()

router.post("/",teamControllers.createTeam)
router.get("/",teamControllers.getAllTeam)
router.get("/:id",teamControllers.getTeamById)
router.put("/:id",teamControllers.updateTeam)
router.delete("/:id",teamControllers.deleteTeam)

export default router
