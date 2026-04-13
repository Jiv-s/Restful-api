import ApiError from "../config/utils/api-error";

const validate = (Dtoclass)=>{
    return (req,res,next)=>{
        const {errors,value} = Dtoclass.validate(req.body) // accessing the validate function from basedto 
        if(errors){
            throw ApiError.badRequest(errors.join(';'))
        }
        
        req.body =value  // now date is validted so we will only store the validated data 
        next()
    }
}