import ApiResponse from './../../common/config/utils/api-response.js'
import * as authService from './auth.serices.js'

const register = async (req,res)=>{
    const user = authService.register(req.body)    //responsible to send the data to the service 
    ApiResponse.created(res,"Registration is done",user)
}
const login = async(req,res)=>{
    const {user,refreshToken,accessToken} = authService.login(req.body)
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
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
    await authService.getMe(req.user.id)
    ApiResponse.ok(res,"User profile",user)
}

export {register,login,logout,getMe}