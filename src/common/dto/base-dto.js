import joi from 'joi'

class BaseDto {
    static schema = joi.object({}) // acts as a empty container will use as req
    static validate(data){
        const {error,value} = this.schema.validate({
            abortEarly:false, //sare errors eksath dedo
            stripUnknown:true // only fiels defined by me
        })
        if(error){
            const errors = error.details.map((d)=>d.message)
            return {errors,value:null}
        }
        return{errors:null,value} //make sure of the consistency is maintained 
    }
}

export default BaseDto