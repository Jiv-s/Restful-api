import { Router } from "express";
import * as controller from "../controllers/owner.js"

const router = new Router()

router.post("/",controller.createOwner)  //to crate new 
router.get("/",controller.getAllOwner)   //to view all
router.get("/:id",controller.getOwnerById)  //get by id 
router.put("/:id",controller.updatedOwner)  //update
router.delete("/:id",controller.deleteOwner) //deltete

export default router