import Joi from "joi";
import BaseDto from "../../../common/dto/base-dto.js";

//for all login resetpassword ect 

//whenever data comes it will go from base dto 


class RegistorDto extends BaseDto{
    static schema = Joi.object({
        name:Joi.string().trim().min(2).max(50),
        email:Joi.string().email().lowercase().required(), //email() check all theta like if it has @ .com ect
        password:Joi.string()
                    .messages({"err" : "password must be atleast 8 char long"}) // this is same message in the baseDTO file in error.message
                    .required().min(8),
        role:Joi.string().valid("customer" , "seller",).default("customer")
    })
}

export default RegistorDto