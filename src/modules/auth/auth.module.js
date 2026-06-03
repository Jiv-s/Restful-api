import { boolean, custom, date, required, string } from "joi"
import mongoose from "mongoose"
import bcrypt from 'bcrypt'

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
        required:[true,"email is require"],
        unique:true,
        lowercase:true,
    },
    passward:{
        type:string,
        required:[true,"passward is require"],
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

userSchema.pre('save',async function (){
    if(!this.isModified('passward'))return next()
    this.passward = await bcrypt.hash(this.passward,10)
    next()
})

userSchema.methods.comparePass = async function(clrtxtpass) {
    return bcrypt.compare(clrtxtpass,this.passward)
}

export default mongoose.model("user",userSchema)