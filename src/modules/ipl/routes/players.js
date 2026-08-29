import { Router } from "express";
import * as playerControllers from "../controllers/player.js"
import player from "../models/player.js";

const router = new Router()

router.post("/",playerControllers.createplayer)
router.get("/",playerControllers.getAllplayer)
router.get("/:id",playerControllers.getplayerById)
router.put("/:id",playerControllers.updateplayer)
router.delete("/:id",playerControllers.deleteplayer)

export default router
