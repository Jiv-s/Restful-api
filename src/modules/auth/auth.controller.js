import ApiResponse from './../../common/config/utils/api-response.js'
import * as authService from './auth.serices.js'

const register = async (req,res)=>{
    const user = await authService.register(req.body)    //responsible to send the data to the service 
    ApiResponse.created(res,"Registration is done",user)
}
const login = async(req,res)=>{
    const {user,refreshToken,accessToken} = await authService.login(req.body)
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:'strict',
        maxAge:7*24*60*60*1000
    })
    ApiResponse.created(res,"login sucesfully",{user,accessToken})
}

const logout = async (req,res)=>{
    await authService.logout(req.user.id)
    res.clearCookie("refreshToken")
    ApiResponse.ok(res,"Logout Sucessfull")
}

const getMe = async(req,res)=>{
    const user = await authService.getMe(req.user.id)
    ApiResponse.ok(res,"User profile",user)
}

const avatar = async(req,res)=>{
   const result = await authService.avataruplaod(req.user.id,req.file)
    ApiResponse.ok(res,"uploaded avatar successfully",{avatarUrl:result.url})
}

export {register,login,logout,getMe,avatar}