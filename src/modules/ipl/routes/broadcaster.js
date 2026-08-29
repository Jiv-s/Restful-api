import { Router } from "express";
import * as broadcasteController from "../controllers/broadcaster.js"
const router = new Router()

router.post("/",broadcasteController.createBroadcaster)
router.get("/",broadcasteController.getAllBroadcaster)
router.get("/:id",broadcasteController.getBroadcasterById)
router.put("/:id",broadcasteController.updateBroadcaster)
router.delete("/:id",broadcasteController.deleteBroadcaster)

export default router