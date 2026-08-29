import { Router } from "express";
import * as sponserController from "../controllers/sponser.js"

const router = new Router()

router.post("/",sponserController.createSponser)
router.get("/",sponserController.getAllSponser)
router.get("/:id",sponserController.getSponserById)
router.put("/:id",sponserController.updateSponser)
router.delete("/:id",sponserController.deleteSponser)

export default router