import { boolean, custom, date, string } from "joi"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:string,
        trim:true,
        minlength:2,
        maxlength:50,
        require:[true,"Name is require"]
    },
    email:{
        type:string,
        trim:true,
        require:[true,"email is require"],
        unique:true,
        lowercase:true,
    },
    passward:{
        type:string,
        require:[true,"passward is require"],
        minlength:8,
        maxlength:200,
        select:false, // doesnot returns this when user is created
    },
    role:{
        type:string,
        enum:["customer","admin","seller"],
        default:"customer",

    },
    isverified:{
        type:boolean,
        default:false
    },
    verificationToken:{type:string,select:false},
    refreshToken:{type:string,select:false},
    resetPasswardToken:{type:string,select:false},
    resetPasswardExpires:{type:date,select:false},

    
},{timestamps:true})  //rember this is second argument auto maps time

export default mongoose.model("user",userSchema)