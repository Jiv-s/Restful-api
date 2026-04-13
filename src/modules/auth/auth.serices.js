import { use } from "react";
import ApiError from "../../common/config/utils/api-error";
import { generateAceessToken, generateRefreshToken, generateResetToken, verifyAcessToken } from "../../common/config/utils/jwt-utils";
import User from "./auth.module"
import { decode } from "jsonwebtoken";

//hashing function to store hashed token in db as save space
const hashedToken = (token)=> {
    return crypto
            .createHash("sha256")
            .update(rawToken)
            .digest(hex)
    
    }

const register = async ({name,email,passward,role})=>{
    const existing = await User.findOne({email})  //also a mongoose function
    if(existing) throw ApiError.conflict("email already exist")


        const {rawToken,hashToken} = generateResetToken
        
        const user = await User.Create({  //is a database call 
            name,                                               
            email,                               
            passward,
            role,
            verificationToken : hashToken
    })
    // todo send emailto user with token:raw token
    // if you forgot that select is true you can manully delete it form here
    const userObj= user.toObject()
    delete userObj.passward
    delete userObj.verificationToken 

}

const login = async ({email,passward}) => {
    const user = await User.findOne(email).select("+passward") //to select true for passward
    if(!user) return ApiError.unauthorised("email passward is invalid") 
        
    // todo check validate passward

    if(!isVerified) return ApiError.forbidden("verify before login")
    
    //generating tokens 

    const accessToken = generateAceessToken({id:user._id , role:user.role})
    const refreshToken = generateRefreshToken({id:user._id})

    //store in db 
    user.refreshToken = hashedToken(refreshToken)
    //these changes are being done on the copy of user schema
    //orginal 

    await user.save({validateBeforeSave : false}) // saves in db og copy and says dont validate as i know what i am doing
    //await as db is in another continent 

    const userObj = user.toObject()
    delete userObj.passward
    delete userObj.refreshToken

    return({user:userObj , refreshToken,accessToken})
}

const refresh = async(token) =>{
    if(!token) throw ApiError.unauthorised("token dne")
    const decoded  = await verifyAcessToken(token) 
    const user  = await User.findbyId(decoded.id)
    if(!user) throw ApiError.unauthorised("user dne")
        
    const accessToken = generateAceessToken({id:user._id,role:user.role})

    const refreshToken = generateRefreshToken({id:user._id})
    user.refreshToken = hashedToken(refreshToken)
    await user.save({validateBeforeSave : false}) // saves in db og copy and says dont validate as i know what i am doing
    
    const userObj = user.toObject()
    delete userObj.passward
    delete userObj.refreshToken

    return {accessToken,refreshToken}

}

const logout = async(userId)=>{
    await User.findbyIdAndUpdate(userId,{refreshToken:undefined})
}

const forgotPassward = async(email)=>{
    const user =await User.findOne(email)
    if(!user) throw ApiError.notfount("user not found")
    const{rawToken,hashedToken} = generateResetToken
    user.resetPasswardToken = hashedToken //store in db 
    user.resetPasswardExpires = 15*60*1000 ///15 min
    await user.save()


    //todo mail services
}