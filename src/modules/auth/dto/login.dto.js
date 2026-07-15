import BaseDto from "../../../common/dto/base-dto.js";
import Joi from "joi";

class loginDto extends BaseDto {
    static schema =Joi.object({
        email:Joi.string().email().lowercase().required().max(100).min(5),
        password:Joi.string().required().min(8)
    })
}

export default loginDto