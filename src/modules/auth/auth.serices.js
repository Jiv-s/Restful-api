// cleanup: remove accidental react import
import ApiError from "../../common/config/utils/api-error.js";
import { generateAceessToken, generateRefreshToken, generateResetToken, verifyAcessToken } from "../../common/config/utils/jwt-utils.js";
import User from "./auth.module.js"
import { decode } from "jsonwebtoken";

//hashing function to store hashed token in db as save space
const hashedToken = (token)=> {
    return crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex")
    
    }

const register = async ({name,email,password,role})=>{
    const existing = await User.findOne({email})  //also a mongoose function
    if(existing) throw ApiError.conflict("email already exist")


        const {rawToken,hashToken} = generateResetToken()
        
    console.log("Before create");

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashToken,
    });

    console.log("Created user:", user);
    // todo send email to user with token:raw token
    // if you forgot that select is true you can manully delete it form here
    const userObj= user.toObject()
    delete userObj.password
    delete userObj.verificationToken 
    return userObj;
}

const login = async ({email,password} = {}) => {
    if (!email || !password) throw ApiError.badRequest('email and password are required')
    const user = await User.findOne({email}).select("+password") //to select true for password
    if(!user) return ApiError.unauthorised("email password is invalid") 
        
    // todo check validate password
    const ismatched = await user.comparePassword(password) 
    if(!ismatched) throw ApiError.unauthorised("invalid password")

    if(!user.isVerified) return ApiError.forbidden("verify before login")
    
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
    delete userObj.password
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
    delete userObj.password
    delete userObj.refreshToken

    return {accessToken,refreshToken}

}

const logout = async(userId)=>{
    await User.findbyIdAndUpdate(userId,{refreshToken:undefined}) //this is a db call
}

const forgotpassword = async(email)=>{
    const user =await User.findOne({email})
    if(!user) throw ApiError.notfount("user not found")
    const{rawToken,hashedToken} = generateResetToken()
    user.resetpasswordToken = hashedToken //store in db 
    user.resetpasswordExpires = 15*60*1000 ///15 min
    await user.save()


    //todo mail services
}

const getMe = async(userId)=>{
    const user = User.findbyId(userId)
    if(!user) throw ApiError.notfound("user dne")
    return user
}

const avatar = 

export {register,login,refresh,logout,forgotpassword,getMe}