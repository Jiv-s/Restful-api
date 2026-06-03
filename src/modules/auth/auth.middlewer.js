import ApiError from "../../common/config/utils/api-error.js";
import { verifyAcessToken } from "../../common/config/utils/jwt-utils.js";
import user from "../auth/auth.module.js"

const authenticate = async(req,res,next)=>{
    let token
    if(req.headers.authorization?.startsWith("Bearer")){
        token  = req.headers.authorization.split(" ")[1]
    }

    if(!token) throw ApiError.unauthorised("not authenticated")
    
    const decoded = verifyAcessToken(token) //has two fields one id and role and jwt attached exp time and issue time
    const user= await User.findById(decoded.id)
    if(!user) throw ApiError.unauthorised("user no longer exist")
    
    req.user={
        id:user.id,
        name:user.name,
        role:user.role,
        email:user.email 
    }

    next()
}
const authorize = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)) throw ApiError.forbidden("you are not authorize for this action")
        next()
        }
}
export{authenticate,authorize}