import {Router} from "express"
import * as controller from "./auth.controller.js"
import validate from "./../../common/middleware/validate.middleware.js"
import RegisterDto from "./dto/registor.dto.js"
import loginDto from "./dto/login.dto.js"
import { authenticate } from "./auth.middlewer.js"


const router = Router()

router.post('/register',validate(RegisterDto),controller.register)
router.post('/login',validate(loginDto),controller.login)
router.post('/logout',authenticate,controller.logout)
router.get('/getMe',authenticate,controller.getMe)
export default router