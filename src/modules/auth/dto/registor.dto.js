import Joi from "joi";
import BaseDto from "../../../common/dto/base-dto";

//for all login resetpassward ect 

//whenever data compes it will go from base dto 


class RegistorDto extends BaseDto{
    static schema = Joi.object({
        name:Joi.string().trim().min(2).max(50),
        email:Joi.string().email().lowercase().required(), //email() check all theta like if it has @ .com ect
        passward:Joi.string()
                    .message("passward must be atleast 8 char long") // this is same message in the baseDTO file in error.message
                    .required().min(8),
        role:Joi.string().valid("customer" , "seller").default("customer")
    })
}

